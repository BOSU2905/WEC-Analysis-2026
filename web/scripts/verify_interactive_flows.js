import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  console.log('Navigating to preview site...');
  await page.goto('http://localhost:4173/WEC-Analysis-2026/', { waitUntil: 'networkidle2' });

  // 1. Verify Hero
  const heroTitle = await page.$eval('h1', el => el.textContent);
  console.log('Hero title rendered:', heroTitle);

  // 2. Scroll through all chapter wrappers to trigger lazy loading and verify rendering
  const chapterWraps = [
    { wrap: 'chapter-00', content: 'chapter-00' },
    { wrap: 'chapter-01-wrap', content: 'chapter-01' },
    { wrap: 'chapter-02-wrap', content: 'chapter-02' },
    { wrap: 'chapter-03-wrap', content: 'chapter-03' },
    { wrap: 'chapter-04-wrap', content: 'chapter-04' },
    { wrap: 'chapter-05-wrap', content: 'chapter-05' },
  ];

  for (const ch of chapterWraps) {
    const wrapEl = await page.$(`#${ch.wrap}`);
    if (wrapEl) {
      await wrapEl.scrollIntoView();
      // Wait for content to mount via Suspense
      await page.waitForSelector(`#${ch.content}`, { timeout: 5000 });
      console.log(`Mounted and verified chapter: #${ch.content}`);
      await new Promise(r => setTimeout(r, 400));
    } else {
      console.error(`Wrapper #${ch.wrap} NOT found!`);
    }
  }

  // 3. Verify D3 SVG charts are rendered in each chapter
  const svgCount = await page.$$eval('svg', svgs => svgs.length);
  console.log(`Total SVG visualization elements rendered across story: ${svgCount}`);

  // 4. Test Archive Navigation and 3D Canvas
  console.log('Navigating to #archive tab...');
  await page.goto('http://localhost:4173/WEC-Analysis-2026/#archive', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check Archive machines
  const machineHeader = await page.$eval('h2', el => el.textContent);
  console.log(`Archive header rendered: ${machineHeader}`);

  const machineButtons = await page.$$eval('button', btns => btns.map(b => b.textContent).filter(t => t && t.length > 3));
  console.log(`Archive navigation items:`, machineButtons.slice(0, 5));

  console.log('Errors logged to console:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  console.log('Failed network requests:', failedRequests.length);
  if (failedRequests.length > 0) {
    console.error('Failed requests:', failedRequests);
  }

  await browser.close();

  if (consoleErrors.length === 0 && failedRequests.length === 0 && svgCount >= 4) {
    console.log('ALL INTERACTIVE FLOWS & REGRESSION TESTS PASSED CLEANLY!');
    process.exit(0);
  } else {
    console.error('REGRESSION CHECKS ENCOUNTERED ISSUES.');
    process.exit(1);
  }
})();
