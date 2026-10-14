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
  console.log('Chapter 01 on mobile:', ch);

  for (const factor of [0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95]) {
    const y = ch.top + ch.height * factor;
    await page.evaluate(y => window.scrollTo(0, y), y);
    await new Promise(r => setTimeout(r, 600));

    // Sample some pixel colors on the canvas to see if clusters are formed
    const state = await page.evaluate(() => {
      const canvas = document.querySelector('#chapter-01 canvas');
      if (!canvas) return null;
      const ctx = canvas.getContext('2d');
      // check if center has dots or upper-left has teal dots
      const d1 = ctx.getImageData(Math.floor(canvas.width * 0.35), Math.floor(canvas.height * 0.34), 1, 1).data;
      const d2 = ctx.getImageData(Math.floor(canvas.width * 0.65), Math.floor(canvas.height * 0.34), 1, 1).data;
      const d3 = ctx.getImageData(Math.floor(canvas.width * 0.50), Math.floor(canvas.height * 0.58), 1, 1).data;
      return {
        ptTopClass: Array.from(d1),
        ptLMP2: Array.from(d2),
        ptGT: Array.from(d3)
      };
    });
    console.log(`Factor ${factor} (y=${Math.round(y)}):`, state);
  }
  await browser.close();
})();
