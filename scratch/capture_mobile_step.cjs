const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Find step 2 or 3 in chapter 1
  const stepInfo = await page.evaluate(() => {
    const steps = Array.from(document.querySelectorAll('#chapter-01 [class*="step"]'));
    return steps.map((s, idx) => {
      const r = s.getBoundingClientRect();
      const st = window.pageYOffset || document.documentElement.scrollTop;
      return { idx, top: r.top + st, text: s.textContent.slice(0, 30) };
    });
  });
  console.log('Steps in Chapter 01:', stepInfo);

  if (stepInfo.length > 1) {
    // Scroll to middle of second step
    const targetY = stepInfo[1].top + 100;
    console.log(`Scrolling to step 2 at y=${targetY}...`);
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
    await new Promise(r => setTimeout(r, 1200));

    // Hide text container to clearly view the canvas on mobile
    await page.evaluate(() => {
      const tc = document.querySelector('#chapter-01 [class*="textContainer"]');
      if (tc) tc.style.opacity = '0.1';
    });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(__dirname, 'mobile_step2_clustered.png') });
    console.log('Saved mobile_step2_clustered.png');

    // Also unhide text to show real view
    await page.evaluate(() => {
      const tc = document.querySelector('#chapter-01 [class*="textContainer"]');
      if (tc) tc.style.opacity = '1.0';
    });
    await page.screenshot({ path: path.join(__dirname, 'mobile_step2_real.png') });
    console.log('Saved mobile_step2_real.png');
  }

  await browser.close();
})();
