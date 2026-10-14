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

  await page.evaluate(() => {
    window.scrollTo({ top: 5956, behavior: 'instant' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot canvas element
  const canvasEl = await page.$('#chapter-01 canvas');
  if (canvasEl) {
    await canvasEl.screenshot({ path: path.join(__dirname, 'mobile_5956_canvas.png') });
    console.log('Saved mobile_5956_canvas.png');
  }

  // Hide text
  await page.evaluate(() => {
    const tc = document.querySelector('#chapter-01 [class*="textContainer"]');
    if (tc) tc.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(__dirname, 'mobile_5956_unobscured.png') });
  console.log('Saved mobile_5956_unobscured.png');

  await browser.close();
})();
