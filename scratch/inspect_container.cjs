const puppeteer = require('../web/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const dims = await page.evaluate(() => {
    const ch = document.getElementById('chapter-01');
    const container = ch.querySelector('[class*="graphicSticky"]');
    const canvas = ch.querySelector('canvas');
    const cr = container.getBoundingClientRect();
    const canr = canvas ? canvas.getBoundingClientRect() : null;
    return {
      window: { width: window.innerWidth, height: window.innerHeight },
      container: { width: cr.width, height: cr.height, top: cr.top, left: cr.left },
      canvas: canr ? { width: canr.width, height: canr.height, top: canr.top, left: canr.left } : null
    };
  });
  console.log('Desktop 1440x900 dimensions:', JSON.stringify(dims, null, 2));

  await browser.close();
})();
