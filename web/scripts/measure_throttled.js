import puppeteer from 'puppeteer';

const NETWORK_PROFILES = {
  unthrottled: null,
  fast4G: {
    offline: false,
    downloadThroughput: (4 * 1024 * 1024) / 8, // 4 Mbps
    uploadThroughput: (3 * 1024 * 1024) / 8,   // 3 Mbps
    latency: 20
  },
  slow4G: {
    offline: false,
    downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
    uploadThroughput: (750 * 1024) / 8,          // 750 kbps
    latency: 150
  }
};

async function runTest(profileName, profile) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const client = await page.target().createCDPSession();
  await client.send('Network.enable');

  if (profile) {
    await client.send('Network.emulateNetworkConditions', profile);
  }

  let totalTransfer = 0;
  const requests = [];

  client.on('Network.loadingFinished', params => {
    totalTransfer += params.encodedDataLength;
  });

  client.on('Network.requestWillBeSent', params => {
    requests.push({
      url: params.request.url,
      type: params.type,
      priority: params.request.initialPriority
    });
  });

  const t0 = Date.now();
  await page.goto('http://127.0.0.1:4173/WEC-Analysis-2026/', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });
  const totalDuration = Date.now() - t0;

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paints = performance.getEntriesByType('paint');
    
    return new Promise(resolve => {
      let lcp = null;
      try {
        const observer = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          if (entries.length > 0) {
            lcp = entries[entries.length - 1].startTime;
          }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {}

      setTimeout(() => {
        resolve({
          nav: {
            ttfb: nav.responseStart - nav.requestStart,
            domInteractive: nav.domInteractive,
            domContentLoaded: nav.domContentLoadedEventEnd,
            load: nav.loadEventEnd
          },
          paints: paints.map(p => ({ name: p.name, time: p.startTime })),
          lcp: lcp
        });
      }, 500);
    });
  });

  await browser.close();

  return {
    profileName,
    totalDuration,
    totalTransfer,
    requestCount: requests.length,
    metrics
  };
}

(async () => {
  console.log("Starting network emulation benchmark...\n");

  for (const [name, profile] of Object.entries(NETWORK_PROFILES)) {
    console.log(`Testing ${name}...`);
    const res = await runTest(name, profile);
    console.log(`  Duration           : ${(res.totalDuration / 1000).toFixed(2)}s`);
    console.log(`  Total Transfer     : ${(res.totalTransfer / 1024).toFixed(1)} KB`);
    console.log(`  Requests count     : ${res.requestCount}`);
    console.log(`  TTFB               : ${res.metrics.nav.ttfb.toFixed(1)}ms`);
    console.log(`  DOM Content Loaded : ${res.metrics.nav.domContentLoaded.toFixed(1)}ms`);
    console.log(`  Load Event         : ${res.metrics.nav.load.toFixed(1)}ms`);
    for (const p of res.metrics.paints) {
      console.log(`  ${p.name.padEnd(20)}: ${p.time.toFixed(1)}ms`);
    }
    console.log(`  LCP                : ${res.metrics.lcp ? res.metrics.lcp.toFixed(1) + 'ms' : 'N/A'}`);
    console.log("");
  }
})();
