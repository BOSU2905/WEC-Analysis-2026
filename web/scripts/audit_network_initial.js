import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const initialRequests = [];
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  client.on('Network.requestWillBeSent', params => {
    initialRequests.push({
      requestId: params.requestId,
      url: params.request.url,
      method: params.request.method,
      initialPriority: params.request.initialPriority,
      type: params.type,
      time: params.wallTime
    });
  });

  const responseMap = new Map();
  client.on('Network.responseReceived', params => {
    responseMap.set(params.requestId, {
      status: params.response.status,
      mimeType: params.response.mimeType,
      encodedDataLength: params.response.encodedDataLength,
      fromDiskCache: params.response.fromDiskCache,
      fromServiceWorker: params.response.fromServiceWorker
    });
  });

  const completedMap = new Map();
  client.on('Network.loadingFinished', params => {
    completedMap.set(params.requestId, {
      encodedDataLength: params.encodedDataLength
    });
  });

  console.log("Navigating to http://127.0.0.1:4173/WEC-Analysis-2026/ without scrolling...");
  const t0 = Date.now();
  await page.goto('http://127.0.0.1:4173/WEC-Analysis-2026/', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  const navTime = Date.now() - t0;

  // Wait 3 seconds to capture any idle preloading
  await new Promise(r => setTimeout(r, 3000));

  // Extract performance metrics
  const perfMetrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    // Check LCP via PerformanceObserver entries if available
    return {
      nav: nav ? {
        domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
        loadEventEnd: nav.loadEventEnd,
        duration: nav.duration
      } : null,
      paints: paint.map(p => ({ name: p.name, startTime: p.startTime }))
    };
  });

  console.log(`\nInitial Page Load Completed in ${navTime}ms`);
  console.log(`DOM Content Loaded: ${perfMetrics.nav?.domContentLoadedEventEnd?.toFixed(1)}ms`);
  console.log(`Load Event: ${perfMetrics.nav?.loadEventEnd?.toFixed(1)}ms`);
  for (const p of perfMetrics.paints) {
    console.log(`${p.name}: ${p.startTime.toFixed(1)}ms`);
  }

  console.log("\n" + "=" * 90);
  console.log(`TOTAL INITIAL NETWORK REQUESTS: ${initialRequests.length}`);
  console.log("=" * 90);

  let totalBytes = 0;
  const categorized = {};

  const details = [];
  for (const req of initialRequests) {
    const resp = responseMap.get(req.requestId);
    const finish = completedMap.get(req.requestId);
    const size = finish?.encodedDataLength || resp?.encodedDataLength || 0;
    totalBytes += size;

    const urlObj = new URL(req.url);
    const path = urlObj.pathname;
    const type = req.type || 'Other';
    
    if (!categorized[type]) categorized[type] = { count: 0, bytes: 0 };
    categorized[type].count += 1;
    categorized[type].bytes += size;

    details.push({
      path,
      type,
      size,
      status: resp?.status || 'unknown',
      priority: req.initialPriority
    });
  }

  details.sort((a, b) => b.size - a.size);

  console.log("\nINITIAL LOAD BY RESOURCE TYPE:");
  for (const [t, data] of Object.entries(categorized)) {
    console.log(`${t.padEnd(16)}: ${String(data.count).padStart(3)} requests | ${(data.bytes / 1024).toFixed(1).padStart(8)} KB`);
  }
  console.log(`TOTAL INITIAL TRANSFER: ${(totalBytes / 1024).toFixed(1)} KB (${(totalBytes / (1024*1024)).toFixed(2)} MB)`);

  console.log("\nINITIAL LOAD TOP 25 ASSETS:");
  console.log(`${'Path'.padEnd(55)} | ${'Type'.padEnd(12)} | ${'Size (KB)'.padStart(10)} | ${'Priority'.padEnd(8)}`);
  console.log("-".repeat(95));
  for (const d of details.slice(0, 25)) {
    console.log(`${d.path.padEnd(55)} | ${d.type.padEnd(12)} | ${(d.size / 1024).toFixed(1).padStart(10)} KB | ${String(d.priority).padEnd(8)}`);
  }

  await browser.close();
})();
