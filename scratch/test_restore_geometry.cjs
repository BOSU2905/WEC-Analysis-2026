const path = require('path');
const fs = require('fs');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 1024, height: 768 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));

    const chapter01 = await page.evaluate(() => {
      const el = document.getElementById('chapter-01');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const st = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + st, height: el.offsetHeight };
    });

    if (chapter01) {
      // Scroll to settled clusters state (~50% into chapter)
      const targetY = chapter01.top + chapter01.height * 0.45;
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
      await new Promise(r => setTimeout(r, 1200));

      const shotPath = path.join(__dirname, `restored_${vp.name}_settled.png`);
      await page.screenshot({ path: shotPath });
      console.log(`Saved screenshot: ${shotPath}`);

      // Check canvas bounding box and clusters
      const box = await page.evaluate(() => {
        const c = document.querySelector('#chapter-01 canvas');
        if (!c) return null;
        const r = c.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      });
      console.log(`Canvas box for ${vp.name}:`, box);
    }
    await page.close();
  }

  // PART 2: Interactive Pointer Testing on Desktop (1440x900)
  console.log(`\n=== Running Pointer Hit-Testing & Boundary Sweeps (1440x900) ===`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const chapter01 = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + st, height: el.offsetHeight };
  });

  const targetY = chapter01.top + chapter01.height * 0.45;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
  await new Promise(r => setTimeout(r, 1200));

  const canvasBox = await page.evaluate(() => {
    const c = document.querySelector('#chapter-01 canvas');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  async function getActiveLabel() {
    return await page.evaluate(() => {
      const labels = document.querySelectorAll('#chapter-01 svg g.label-group');
      let best = null;
      labels.forEach(g => {
        const opacity = parseFloat(window.getComputedStyle(g).opacity || '0');
        if (opacity > 0.15) {
          best = { className: g.getAttribute('data-class'), opacity };
        }
      });
      return best;
    });
  }

  // Test 1: Hover Top Class
  const topX = canvasBox.left + canvasBox.width * 0.35;
  const topY = canvasBox.top + canvasBox.height * 0.38;
  await page.mouse.move(topX, topY);
  await new Promise(r => setTimeout(r, 400));
  let active = await getActiveLabel();
  console.log('Hovering Top Class (0.35, 0.38):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_topclass.png') });

  // Test 2: Hover LMP2
  const lmpX = canvasBox.left + canvasBox.width * 0.64;
  const lmpY = canvasBox.top + canvasBox.height * 0.38;
  await page.mouse.move(lmpX, lmpY);
  await new Promise(r => setTimeout(r, 400));
  active = await getActiveLabel();
  console.log('Hovering LMP2 (0.64, 0.38):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_lmp2.png') });

  // Test 3: Hover GT
  const gtX = canvasBox.left + canvasBox.width * 0.50;
  const gtY = canvasBox.top + canvasBox.height * 0.60;
  await page.mouse.move(gtX, gtY);
  await new Promise(r => setTimeout(r, 400));
  active = await getActiveLabel();
  console.log('Hovering GT (0.50, 0.60):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_gt.png') });

  // Test 4: Hover Experimental
  const expX = canvasBox.left + canvasBox.width * 0.22;
  const expY = canvasBox.top + canvasBox.height * 0.72;
  await page.mouse.move(expX, expY);
  await new Promise(r => setTimeout(r, 400));
  active = await getActiveLabel();
  console.log('Hovering Experimental (0.22, 0.72):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_experimental.png') });

  // Test 5: Boundary Sweep between Top Class and LMP2
  console.log('\nTesting Boundary Sweep from Top Class to LMP2...');
  const startX = canvasBox.left + canvasBox.width * 0.44;
  const endX = canvasBox.left + canvasBox.width * 0.54;
  const sweepY = canvasBox.top + canvasBox.height * 0.38;
  
  await page.mouse.move(startX, sweepY);
  await new Promise(r => setTimeout(r, 200));
  const boundaryStart = await getActiveLabel();
  
  await page.mouse.move(endX, sweepY, { steps: 10 });
  await new Promise(r => setTimeout(r, 200));
  const boundaryEnd = await getActiveLabel();
  console.log(`Boundary sweep x=0.44 -> x=0.54: start=${boundaryStart?.className}, end=${boundaryEnd?.className}`);

  // Test 6: Empty Space between upper lobes (x=0.50, y=0.15)
  const emptyX = canvasBox.left + canvasBox.width * 0.50;
  const emptyY = canvasBox.top + canvasBox.height * 0.15;
  await page.mouse.move(emptyX, emptyY);
  await new Promise(r => setTimeout(r, 400));
  active = await getActiveLabel();
  console.log('Hovering Empty Space above clusters (should be null):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_empty_space.png') });

  // Test 7: Outside canvas on narrative text
  const narrativeX = canvasBox.left + canvasBox.width + 150;
  const narrativeY = canvasBox.top + 300;
  await page.mouse.move(narrativeX, narrativeY);
  await new Promise(r => setTimeout(r, 400));
  active = await getActiveLabel();
  console.log('Pointer moved to Narrative (should be null):', active);
  await page.screenshot({ path: path.join(__dirname, 'restored_hover_outside.png') });

  await browser.close();
  console.log('\nAll browser validation completed successfully!');
})();
