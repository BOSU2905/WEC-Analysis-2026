const path = require('path');
const puppeteer = require(path.join(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/', { waitUntil: 'networkidle0' });

  // Get ch1 metrics
  const ch1Info = await page.evaluate(() => {
    const ch1 = document.getElementById('chapter-01');
    const scrolly = ch1.querySelector('[class*="scrollyContainer"]');
    return {
      ch1Top: ch1.offsetTop,
      ch1Height: ch1.offsetHeight,
      scrollyTop: scrolly.offsetTop,
      scrollyHeight: scrolly.offsetHeight
    };
  });
  console.log("Chapter 1 metrics:", ch1Info);

  // Scroll to 80% through scrollyContainer
  const targetY = ch1Info.ch1Top + ch1Info.scrollyHeight * 0.7;
  await page.evaluate((y) => window.scrollTo(0, y), targetY);
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(__dirname, 'verified_ch1_70pct_scroll.png') });

  // Check hover at 70% scroll
  const canvasBounds = await page.evaluate(() => {
    const canvas = document.querySelector('#chapter-01 canvas');
    const r = canvas.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  const topClassX = canvasBounds.left + canvasBounds.width * 0.35;
  const topClassY = canvasBounds.top + canvasBounds.height * 0.38;
  await page.mouse.move(topClassX, topClassY);
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: path.join(__dirname, 'verified_ch1_70pct_hover_topclass.png') });

  await browser.close();
})();
