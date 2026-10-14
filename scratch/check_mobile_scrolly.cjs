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
    const scrolly = el.querySelector('[class*="scrollyContainer"]');
    const r = scrolly.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: scrolly.offsetHeight };
  });

  console.log('scrolly:', ch);

  for (let progress = 0.0; progress <= 1.0; progress += 0.1) {
    const y = ch.top + (ch.height - 844) * progress;
    await page.evaluate(targetY => window.scrollTo({ top: targetY, behavior: 'instant' }), y);
    await new Promise(r => setTimeout(r, 400));
    console.log('At progress', progress.toFixed(1), 'scrollY =', Math.round(y));
    await page.screenshot({ path: path.resolve(__dirname, `mobile_scrolly_${Math.round(progress * 100)}.png`) });
  }

  await browser.close();
})();
