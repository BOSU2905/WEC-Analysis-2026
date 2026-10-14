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

  const targetY = ch.top + ch.height * 0.65;
  await page.evaluate(y => window.scrollTo(0, y), targetY);
  await new Promise(r => setTimeout(r, 1200));

  // 1. Natural screenshot with story card
  await page.screenshot({ path: path.join(__dirname, 'restored_mobile_settled.png') });
  console.log('Saved restored_mobile_settled.png');

  // 2. Hide text cards to inspect full organic silhouette clearly on mobile
  await page.evaluate(() => {
    const txt = document.querySelector('#chapter-01 [class*="textContainer"]');
    if (txt) txt.style.opacity = '0';
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(__dirname, 'restored_mobile_canvas_clear.png') });
  console.log('Saved restored_mobile_canvas_clear.png');

  await browser.close();
})();
