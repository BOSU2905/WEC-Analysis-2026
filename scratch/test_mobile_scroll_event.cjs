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

  // Scroll to Chapter 01
  const info = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    const scrolly = el.querySelector('[class*="scrollyContainer"]');
    const r = scrolly.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: scrolly.offsetHeight };
  });

  const targetY = info.top + (info.height - 844) * 0.55;
  console.log('Scrolling to targetY:', targetY);

  await page.evaluate(y => {
    window.scrollTo(0, y);
    window.dispatchEvent(new Event('scroll'));
  }, targetY);
  await new Promise(r => setTimeout(r, 1200));

  // Check what progress is inside Framer Motion
  const scatterState = await page.evaluate(() => {
    const cv = document.querySelector('#chapter-01 canvas');
    return {
      canvas: cv ? { width: cv.width, height: cv.height, clientW: cv.clientWidth, clientH: cv.clientHeight } : null
    };
  });
  console.log('Scatter state:', scatterState);

  // Take screenshot with text hidden
  await page.evaluate(() => {
    const tc = document.querySelector('#chapter-01 [class*="textContainer"]');
    if (tc) tc.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 300));

  await page.screenshot({ path: path.join(__dirname, 'mobile_settled_test_event.png') });
  console.log('Saved scratch/mobile_settled_test_event.png');

  await browser.close();
})();
