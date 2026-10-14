const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  console.log('Navigating to Chapter 4...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#chapter-04', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll Chapter 4 into view explicitly
  await page.evaluate(() => {
    const el = document.getElementById('chapter-04');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));

  // Find TyreShare svg inside chapter-04
  const svg = await page.$('#chapter-04 svg[class*="svg"]');
  if (!svg) {
    console.error('TyreShare svg inside chapter-04 not found');
    await browser.close();
    return;
  }

  await svg.scrollIntoView();
  await new Promise(r => setTimeout(r, 600));

  const bbox = await svg.boundingBox();
  console.log('TyreShare SVG bounding box:', bbox);

  await page.screenshot({ path: 'scratch/tyreshare_idle.png' });
  console.log('Captured scratch/tyreshare_idle.png');

  // Dunlop in 2017 is around the middle X of the SVG, upper-middle area
  const dunlopX = bbox.x + bbox.width * 0.55;
  const dunlopY = bbox.y + bbox.height * 0.40;
  console.log(`Hovering Dunlop at (${dunlopX}, ${dunlopY})...`);
  await page.mouse.move(dunlopX, dunlopY);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/tyreshare_dunlop_hover.png' });
  console.log('Captured scratch/tyreshare_dunlop_hover.png');

  // Goodyear in 2022 is at right X (90%), near top of stacked area
  const goodyearX = bbox.x + bbox.width * 0.88;
  const goodyearY = bbox.y + bbox.height * 0.22;
  console.log(`Hovering Goodyear at (${goodyearX}, ${goodyearY})...`);
  await page.mouse.move(goodyearX, goodyearY);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/tyreshare_goodyear_hover.png' });
  console.log('Captured scratch/tyreshare_goodyear_hover.png');

  // Michelin in 2014 is at left-center (35% X, lower Y)
  const michelinX = bbox.x + bbox.width * 0.35;
  const michelinY = bbox.y + bbox.height * 0.70;
  console.log(`Hovering Michelin at (${michelinX}, ${michelinY})...`);
  await page.mouse.move(michelinX, michelinY);
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/tyreshare_michelin_hover.png' });
  console.log('Captured scratch/tyreshare_michelin_hover.png');

  await browser.close();
  console.log('Done.');
})();
