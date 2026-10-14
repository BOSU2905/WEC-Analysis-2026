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
  
  // Scroll to y = 5986 where clusters are fully settled
  await page.evaluate(() => window.scrollTo(0, 5986));
  await new Promise(r => setTimeout(r, 800));

  // In the page, bring graphicSticky into view to capture it
  await page.evaluate(() => {
    const el = document.querySelector('#chapter-01 [class*="graphicContainer"]');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const canvas = await page.$('#chapter-01 canvas');
  if (canvas) {
    await canvas.screenshot({ path: path.join(__dirname, 'restored_mobile_clusters_canvas.png') });
    console.log('Saved restored_mobile_clusters_canvas.png');
  }

  await browser.close();
})();
