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
  
  const ch = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    const r = el.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: el.offsetHeight };
  });

  for (const y of [4500, 5000, 5500, 5986]) {
    await page.evaluate(targetY => window.scrollTo(0, targetY), y);
    await new Promise(r => setTimeout(r, 600));
    const rect = await page.evaluate(() => {
      const c = document.querySelector('#chapter-01 canvas');
      if (!c) return null;
      const r = c.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, winH: window.innerHeight };
    });
    console.log(`Scroll y=${y}: canvas rect =`, rect);
  }

  await browser.close();
})();
