const puppeteer = require('../web/node_modules/puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const info = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    const scrolly = el.querySelector('[class*="scrollyContainer"]');
    const canvas = el.querySelector('canvas');
    return {
      chapterTop: el.getBoundingClientRect().top + window.scrollY,
      chapterHeight: el.offsetHeight,
      scrollyTop: scrolly.getBoundingClientRect().top + window.scrollY,
      scrollyHeight: scrolly.offsetHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      canvasClientWidth: canvas.clientWidth,
      canvasClientHeight: canvas.clientHeight
    };
  });
  console.log('Mobile layout info:', info);

  // Test scroll positions
  for (let pct of [0.2, 0.4, 0.5, 0.6, 0.7]) {
    const y = info.scrollyTop + info.scrollyHeight * pct;
    await page.evaluate(targetY => {
      window.scrollTo(0, targetY);
      window.dispatchEvent(new Event('scroll'));
    }, y);
    await new Promise(r => setTimeout(r, 1200));
    const canvasHandle = await page.evaluateHandle(() => document.querySelector('#chapter-01 canvas'));
    const shotPath = path.resolve(__dirname, `mobile_canvas_pct_${Math.round(pct*100)}.png`);
    await canvasHandle.asElement().screenshot({ path: shotPath });
    console.log(`Saved ${shotPath}`);
  }

  await browser.close();
})();
