const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Find #chapter-01 container
  const scrollInfo = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: el.offsetHeight
    };
  });

  console.log('Chapter 01 scroll info:', scrollInfo);
  if (scrollInfo) {
    // Scroll through the scrolly section so progress is around 0.75
    const targetY = scrollInfo.top + scrollInfo.height * 0.45;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({ path: path.join(__dirname, 'chapter01_clustered.png') });
    console.log('Saved scratch/chapter01_clustered.png');

    // Test hovering over GT cluster
    const scatterBox = await page.evaluate(() => {
      const el = document.querySelector('#chapter-01 canvas');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    });
    console.log('Scatter canvas box:', scatterBox);

    if (scatterBox) {
      console.log('Hovering GT cluster at (0.50, 0.62)...');
      await page.mouse.move(scatterBox.left + scatterBox.width * 0.50, scatterBox.top + scatterBox.height * 0.62);
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(__dirname, 'chapter01_gt_hovered.png') });
      console.log('Saved scratch/chapter01_gt_hovered.png');

      console.log('Hovering LMP1/Hypercar (left ear) at (0.35, 0.38)...');
      await page.mouse.move(scatterBox.left + scatterBox.width * 0.35, scatterBox.top + scatterBox.height * 0.38);
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(__dirname, 'chapter01_lmp1_hovered.png') });
      console.log('Saved scratch/chapter01_lmp1_hovered.png');

      console.log('Hovering LMP2 (right ear) at (0.64, 0.38)...');
      await page.mouse.move(scatterBox.left + scatterBox.width * 0.64, scatterBox.top + scatterBox.height * 0.38);
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(__dirname, 'chapter01_lmp2_hovered.png') });
      console.log('Saved scratch/chapter01_lmp2_hovered.png');

      // Test pointer completely outside
      console.log('Moving mouse outside scatter to (20, 20)...');
      await page.mouse.move(20, 20);
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(__dirname, 'chapter01_mouse_outside.png') });
      console.log('Saved scratch/chapter01_mouse_outside.png');
    }
  }

  await browser.close();
})();
