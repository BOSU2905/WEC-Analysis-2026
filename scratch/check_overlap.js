const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  const info = await page.evaluate(() => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav[class*="yearNavigator"]');
    const track = document.querySelector('div[class*="horizontalTrack"]');
    const slide = document.querySelector('div[class*="seasonSlide"]');
    const h2 = document.querySelector('h2[class*="giantSeasonYear"]');
    const r = (el) => el ? {
      x: el.getBoundingClientRect().x,
      y: el.getBoundingClientRect().y,
      top: el.getBoundingClientRect().top,
      bottom: el.getBoundingClientRect().bottom,
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height
    } : null;

    return {
      header: r(header),
      nav: r(nav),
      track: r(track),
      slide: r(slide),
      h2: r(h2),
      windowScrollY: window.scrollY
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
