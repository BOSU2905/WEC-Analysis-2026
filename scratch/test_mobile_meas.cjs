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

  // Scroll to Chapter 01 settled state
  await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    if (el) window.scrollTo({ top: el.offsetTop + 1500, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const res = await page.evaluate(() => {
    const container = document.querySelector('#chapter-01 [class*="ScaleScatter_container"]');
    const canvas = document.querySelector('#chapter-01 canvas');
    return {
      container: container ? { w: container.clientWidth, h: container.clientHeight } : null,
      canvas: canvas ? { w: canvas.width, h: canvas.height, styleW: canvas.style.width, styleH: canvas.style.height } : null
    };
  });
  console.log('Mobile dimensions:', res);

  // Take screenshot of canvas in mobile view
  const canvasEl = await page.$('#chapter-01 canvas');
  if (canvasEl) {
    await canvasEl.screenshot({ path: path.join(__dirname, 'mobile_settled_real.png') });
    console.log('Saved mobile_settled_real.png');
  }

  await browser.close();
})();
