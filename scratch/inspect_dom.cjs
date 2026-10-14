const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  const info = await page.evaluate(() => {
    const canvas = document.querySelector('#chapter-01 canvas');
    const container = document.querySelector('#chapter-01 [class*="container"]');
    const ch = document.getElementById('chapter-01');
    const rect = canvas ? canvas.getBoundingClientRect() : null;
    return {
      canvasRect: rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : null,
      canvas: canvas ? { width: canvas.width, height: canvas.height } : null,
      container: container ? { clientWidth: container.clientWidth, clientHeight: container.clientHeight } : null,
      ch: ch ? { clientWidth: ch.clientWidth, clientHeight: ch.clientHeight } : null,
      dpr: window.devicePixelRatio
    };
  });
  console.log('DOM info at 1440x900:', info);
  await browser.close();
})();
