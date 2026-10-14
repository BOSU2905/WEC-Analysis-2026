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

  await page.evaluate(() => window.scrollTo({ top: 5000, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.resolve(__dirname, 'restored_mobile_actual_settled.png') });
  console.log('Saved scratch/restored_mobile_actual_settled.png');

  // Also take unobscured
  await page.evaluate(() => {
    const tc = document.querySelector('#chapter-01 [class*="textContainer"]');
    if (tc) tc.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve(__dirname, 'restored_mobile_unobscured_settled.png') });
  console.log('Saved scratch/restored_mobile_unobscured_settled.png');

  await browser.close();
})();
