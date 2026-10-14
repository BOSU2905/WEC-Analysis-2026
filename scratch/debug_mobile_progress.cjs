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

  const el = await page.evaluate(() => {
    const scrolly = document.querySelector('#chapter-01 [class*="scrollyContainer"]');
    const r = scrolly.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: scrolly.offsetHeight };
  });
  console.log('scrolly:', el);

  for (let y = el.top - 100; y <= el.top + el.height; y += 400) {
    await page.evaluate(targetY => window.scrollTo({ top: targetY, behavior: 'instant' }), y);
    await new Promise(r => setTimeout(r, 300));
    const state = await page.evaluate(() => {
      const scrolly = document.querySelector('#chapter-01 [class*="scrollyContainer"]');
      const r = scrolly.getBoundingClientRect();
      return {
        scrollyRect: { top: Math.round(r.top), bottom: Math.round(r.bottom) },
        scrollTop: Math.round(window.pageYOffset)
      };
    });
    console.log(`y = ${y}`, state);
  }

  await browser.close();
})();
