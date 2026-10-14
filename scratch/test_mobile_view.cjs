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

  // Find scroll container bounds
  const info = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    const scrolly = el.querySelector('[class*="scrollyContainer"]');
    const r = scrolly.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: scrolly.offsetHeight };
  });

  console.log('Mobile Chapter 01:', info);

  // Take screenshots at a few progress points through Chapter 01
  const points = [0.15, 0.40, 0.65, 0.85];
  for (const p of points) {
    const y = info.top + (info.height - 844) * p;
    await page.evaluate(targetY => window.scrollTo({ top: targetY, behavior: 'instant' }), y);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, `mobile_prog_${Math.round(p * 100)}.png`) });
    console.log(`Saved mobile_prog_${Math.round(p * 100)}.png at y=${Math.round(y)}`);
  }

  await browser.close();
})();
