const path = require('path');
const fs = require('fs');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const results = {
    viewports: {},
    pointerTests: []
  };

  // Helper to get active label from DOM/SVG
  async function getActiveLabelState(page) {
    return await page.evaluate(() => {
      const labels = document.querySelectorAll('#chapter-01 svg g.label-group');
      const activeLabels = [];
      labels.forEach(g => {
        const opacity = parseFloat(window.getComputedStyle(g).opacity || '0');
        const className = g.getAttribute('data-class');
        const transform = g.getAttribute('transform');
        const textElements = Array.from(g.querySelectorAll('text')).map(t => t.textContent.trim());
        if (opacity > 0.05) {
          activeLabels.push({ className, opacity, transform, text: textElements.join(' | ') });
        }
      });
      return activeLabels;
    });
  }

  // --- PART 1: Multi-Viewport Geometry Screenshots (Before and After Settled State) ---
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
    await new Promise(r => setTimeout(r, 1200));

    const chapter01 = await page.evaluate(() => {
      const el = document.getElementById('chapter-01');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const st = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + st, height: el.offsetHeight };
    });

    if (!chapter01) {
      console.error('Could not find #chapter-01!');
      await page.close();
      continue;
    }

    // 1. Before settled state (Scroll to beginning of Chapter 01, ~12% progress: rectangular grid)
    const earlyY = chapter01.top + chapter01.height * 0.08;
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), earlyY);
    await new Promise(r => setTimeout(r, 1000));

    const earlyShot = path.join(__dirname, `validation_${vp.name}_early_grid.png`);
    await page.screenshot({ path: earlyShot });
    console.log(`Saved early grid screenshot: ${earlyShot}`);

    // 2. Settled state (Scroll to ~55% of chapter: settled 3 clusters)
    const settledY = chapter01.top + chapter01.height * 0.45;
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), settledY);
    await new Promise(r => setTimeout(r, 1200));

    const settledShot = path.join(__dirname, `validation_${vp.name}_settled_clusters.png`);
    await page.screenshot({ path: settledShot });
    console.log(`Saved settled clusters screenshot: ${settledShot}`);

    // Inspect rendered canvas dimensions and cluster locations
    const canvasInfo = await page.evaluate(() => {
      const canvas = document.querySelector('#chapter-01 canvas');
      if (!canvas) return null;
      const r = canvas.getBoundingClientRect();
      return { width: r.width, height: r.height, left: r.left, top: r.top };
    });
    console.log(`Canvas info for ${vp.name}:`, canvasInfo);
    results.viewports[vp.name] = { canvasInfo };

    await page.close();
  }

  // --- PART 2: Pointer Interaction Tests on Desktop (1440x900) ---
  console.log(`\n=== Running Pointer Interaction Tests (1440x900) ===`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const ch01 = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    const rect = el.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + st, height: el.offsetHeight };
  });

  const settledY = ch01.top + ch01.height * 0.45;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), settledY);
  await new Promise(r => setTimeout(r, 1200));

  // Get exact SVG touch target centers from DOM
  const clusterCenters = await page.evaluate(() => {
    const centers = {};
    const touchGroups = document.querySelectorAll('#chapter-01 svg g[data-class]');
    touchGroups.forEach(g => {
      const className = g.getAttribute('data-class');
      const transform = g.getAttribute('transform');
      const m = transform ? transform.match(/translate\(([^,]+),\s*([^)]+)\)/) : null;
      if (m) {
        centers[className] = { x: parseFloat(m[1]), y: parseFloat(m[2]) };
      }
    });

    const canvas = document.querySelector('#chapter-01 canvas');
    const r = canvas.getBoundingClientRect();
    return { centers, canvasBox: { left: r.left, top: r.top, width: r.width, height: r.height } };
  });
  console.log('Cluster centers on page:', clusterCenters);

  const cb = clusterCenters.canvasBox;

  // Helper to move mouse relative to canvas
  async function mouseToCanvas(relX, relY) {
    await page.mouse.move(cb.left + relX, cb.top + relY);
    await new Promise(r => setTimeout(r, 400));
  }

  // Test 1: Hover Center of Top Class
  console.log('\nTest 1: Hover Center of Top Class (LMP1/Hypercar)');
  await mouseToCanvas(283, 220);
  let activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_hover_topclass_center.png') });
  results.pointerTests.push({ test: 'hover_topclass_center', activeState });

  // Test 2: Hover Center of LMP2
  console.log('\nTest 2: Hover Center of LMP2');
  await mouseToCanvas(552, 220);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_hover_lmp2_center.png') });
  results.pointerTests.push({ test: 'hover_lmp2_center', activeState });

  // Test 3: Hover Center of GT (GTE Pro/Am)
  console.log('\nTest 3: Hover Center of GT (GTE Pro/Am)');
  await mouseToCanvas(386, 500);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_hover_gt_center.png') });
  results.pointerTests.push({ test: 'hover_gt_center', activeState });

  // Test 4: Hover Center of Experimental Outlier
  console.log('\nTest 4: Hover Center of Experimental');
  await mouseToCanvas(175, 534);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_hover_experimental.png') });
  results.pointerTests.push({ test: 'hover_experimental', activeState });

  // Test 5: Hover Outer Edge of Top Class (Top edge: y ~ 115)
  console.log('\nTest 5: Hover Outer Edge of Top Class (283, 115)');
  await mouseToCanvas(283, 115);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  results.pointerTests.push({ test: 'hover_topclass_outer_edge', activeState });

  // Test 6: Hover Outer Edge of LMP2 (Right edge: x ~ 685, y ~ 220)
  console.log('\nTest 6: Hover Outer Edge of LMP2 (685, 220)');
  await mouseToCanvas(685, 220);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  results.pointerTests.push({ test: 'hover_lmp2_outer_edge', activeState });

  // Test 7: Hover Outer Edge of GT (Bottom edge: x ~ 386, y ~ 660)
  console.log('\nTest 7: Hover Outer Edge of GT (386, 660)');
  await mouseToCanvas(386, 660);
  activeState = await getActiveLabelState(page);
  console.log('Active state:', activeState);
  results.pointerTests.push({ test: 'hover_gt_outer_edge', activeState });

  // Test 8: Move repeatedly between the two upper clusters across touching boundary (x=390 to 420 at y=220)
  console.log('\nTest 8: Move repeatedly between Top Class and LMP2 across touching boundary');
  const boundaryTransitions = [];
  for (const x of [375, 395, 405, 425, 405, 395, 375]) {
    await mouseToCanvas(x, 220);
    const state = await getActiveLabelState(page);
    boundaryTransitions.push({ x, state: state[0]?.className || 'NONE' });
    console.log(`Pointer at x=${x}, y=220 -> Active: ${state[0]?.className || 'NONE'}`);
  }
  await page.screenshot({ path: path.join(__dirname, 'validation_boundary_topclass_lmp2.png') });
  results.pointerTests.push({ test: 'upper_pair_boundary_switch', boundaryTransitions });

  // Test 9: Move between upper-left (Top Class) and lower-center (GT) across boundary
  console.log('\nTest 9: Move between Top Class and GT across boundary (dx=335, dy=360)');
  const topGtTransitions = [];
  for (const t of [0.3, 0.45, 0.52, 0.58, 0.7]) {
    const x = 283 + (386 - 283) * t;
    const y = 220 + (500 - 220) * t;
    await mouseToCanvas(x, y);
    const state = await getActiveLabelState(page);
    topGtTransitions.push({ t, x: Math.round(x), y: Math.round(y), state: state[0]?.className || 'NONE' });
    console.log(`Pointer at (${Math.round(x)}, ${Math.round(y)}) -> Active: ${state[0]?.className || 'NONE'}`);
  }
  await page.screenshot({ path: path.join(__dirname, 'validation_boundary_topclass_gt.png') });
  results.pointerTests.push({ test: 'topclass_gt_boundary_switch', topGtTransitions });

  // Test 10: Move through central gap (three-circle touching region: x ~ 410, y ~ 335)
  console.log('\nTest 10: Central three-way meeting point (x ~ 410, y ~ 335)');
  await mouseToCanvas(410, 335);
  activeState = await getActiveLabelState(page);
  console.log('At central junction (410, 335):', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_central_junction.png') });
  results.pointerTests.push({ test: 'central_junction', activeState });

  // Test 11: Move outside visualization into empty space (x=50, y=50)
  console.log('\nTest 11: Pointer in empty canvas space (50, 50)');
  await mouseToCanvas(50, 50);
  activeState = await getActiveLabelState(page);
  console.log('Empty space active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_empty_space.png') });
  results.pointerTests.push({ test: 'empty_space_clears', activeState });

  // Test 12: Move pointer completely into adjacent narrative content
  console.log('\nTest 12: Pointer into narrative card (x=1150, y=400)');
  await page.mouse.move(1150, 400);
  await new Promise(r => setTimeout(r, 500));
  activeState = await getActiveLabelState(page);
  console.log('Narrative content active state:', activeState);
  await page.screenshot({ path: path.join(__dirname, 'validation_narrative_outside.png') });
  results.pointerTests.push({ test: 'narrative_outside_clears', activeState });

  fs.writeFileSync(path.join(__dirname, 'validation_results.json'), JSON.stringify(results, null, 2));
  console.log('\nWrote scratch/validation_results.json');

  await browser.close();
})();
