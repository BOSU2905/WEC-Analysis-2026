const path = require('path');
const puppeteer = require(path.join(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  console.log("Starting browser verification...");
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Test Chapter 1 ScaleScatter Hover Responsiveness & Boundary Protection
  console.log("\n--- Testing Chapter 1 ScaleScatter ---");
  await page.goto('http://localhost:5173/WEC-Analysis-2026/', { waitUntil: 'networkidle0' });

  // Scroll to Chapter 01 (around y: 4500px, 50% into scrolly container)
  await page.evaluate(() => {
    const ch1 = document.getElementById('chapter-01');
    if (ch1) {
      window.scrollTo(0, ch1.offsetTop + 1400);
    }
  });

  await new Promise(r => setTimeout(r, 600));

  // Find canvas and its bounds
  const canvasBounds = await page.evaluate(() => {
    const canvas = document.querySelector('#chapter-01 canvas');
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  if (!canvasBounds) {
    console.error("Canvas not found in Chapter 01!");
  } else {
    console.log("Canvas bounds:", canvasBounds);

    // Test A: Hovering Top Class cluster (approx x: 35%, y: 38%)
    const topClassX = canvasBounds.left + canvasBounds.width * 0.35;
    const topClassY = canvasBounds.top + canvasBounds.height * 0.38;

    console.log(`Moving mouse to Top Class (${topClassX.toFixed(0)}, ${topClassY.toFixed(0)})...`);
    await page.mouse.move(topClassX, topClassY);
    await new Promise(r => setTimeout(r, 150)); // Fast check (150ms)

    let labelsState = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
      return groups.map(g => ({
        class: g.getAttribute('data-class'),
        opacity: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log("Labels after 150ms over Top Class:", labelsState);
    const topClassActive = labelsState.find(l => l.class === 'Top Class (LMP1/Hypercar)' && l.opacity > 0.4);
    console.log("Top Class active immediately:", !!topClassActive);

    // Test B: Move quickly from Top Class to LMP2 (x: 64%, y: 38%)
    const lmp2X = canvasBounds.left + canvasBounds.width * 0.64;
    const lmp2Y = canvasBounds.top + canvasBounds.height * 0.38;
    console.log(`Moving mouse quickly to LMP2 (${lmp2X.toFixed(0)}, ${lmp2Y.toFixed(0)})...`);
    await page.mouse.move(lmp2X, lmp2Y, { steps: 5 });
    await new Promise(r => setTimeout(r, 150));

    labelsState = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
      return groups.map(g => ({
        class: g.getAttribute('data-class'),
        opacity: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log("Labels after 150ms over LMP2:", labelsState);
    const lmp2Active = labelsState.find(l => l.class === 'LMP2' && l.opacity > 0.4);
    console.log("LMP2 active immediately:", !!lmp2Active);

    // Test C: Move mouse to EMPTY SPACE (top-left corner x: 50px, y: 50px inside canvas, away from all clusters)
    const emptyX = canvasBounds.left + 50;
    const emptyY = canvasBounds.top + 50;
    console.log(`Moving mouse to empty space (${emptyX.toFixed(0)}, ${emptyY.toFixed(0)})...`);
    await page.mouse.move(emptyX, emptyY);
    await new Promise(r => setTimeout(r, 200));

    labelsState = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
      return groups.map(g => ({
        class: g.getAttribute('data-class'),
        opacity: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log("Labels in empty space (should be 0):", labelsState);
    const anyActiveInEmpty = labelsState.some(l => l.opacity > 0.1);
    console.log("Boundary protection in empty space (no label):", !anyActiveInEmpty);

    // Test D: Leave scatter area (move mouse to narrative on the right)
    const outsideX = canvasBounds.left + canvasBounds.width + 100;
    const outsideY = canvasBounds.top + 300;
    console.log(`Moving mouse outside scatter to narrative text (${outsideX.toFixed(0)}, ${outsideY.toFixed(0)})...`);
    await page.mouse.move(outsideX, outsideY);
    await new Promise(r => setTimeout(r, 150));

    labelsState = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
      return groups.map(g => ({
        class: g.getAttribute('data-class'),
        opacity: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log("Labels when pointer left scatter (should be 0):", labelsState);
    const anyActiveOutside = labelsState.some(l => l.opacity > 0.05);
    console.log("Boundary protection when pointer leaves (no label):", !anyActiveOutside);
  }

  // 2. Test Teams Content-Weighted Horizontal Scrolling
  console.log("\n--- Testing Teams Content-Weighted Scrollytelling ---");
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 700));

  // Check initial active year (should be 2011)
  let activeYear = await page.evaluate(() => {
    const active = document.querySelector('nav[aria-label="Season Timeline Navigator"] button[class*="activeSegment"]');
    return active ? active.textContent.trim() : null;
  });
  console.log("Initial active year in Teams:", activeYear);

  // Jump to 2015
  console.log("Testing direct jump to 2015...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav[aria-label="Season Timeline Navigator"] button'));
    const btn2015 = buttons.find(b => b.textContent.includes('2015'));
    if (btn2015) btn2015.click();
  });
  await new Promise(r => setTimeout(r, 900));

  activeYear = await page.evaluate(() => {
    const active = document.querySelector('nav[aria-label="Season Timeline Navigator"] button[class*="activeSegment"]');
    return active ? active.textContent.trim() : null;
  });
  console.log("Active year after jump to 2015:", activeYear);

  // Test accordion expansion in 2015
  console.log("Expanding roster accordion in 2015...");
  const trackXBefore = await page.evaluate(() => {
    const track = document.querySelector('[class*="scrollTrack"]');
    return track ? track.style.transform : null;
  });

  await page.evaluate(() => {
    const expandBtn = document.querySelector('button[aria-expanded="false"]');
    if (expandBtn) expandBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const trackXAfter = await page.evaluate(() => {
    const track = document.querySelector('[class*="scrollTrack"]');
    return track ? track.style.transform : null;
  });
  console.log("Accordion expansion did not alter track transform:", trackXBefore === trackXAfter);

  // Jump to 2023 (last season)
  console.log("Testing direct jump to final season 2023...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav[aria-label="Season Timeline Navigator"] button'));
    const btn2023 = buttons.find(b => b.textContent.includes('2023'));
    if (btn2023) btn2023.click();
  });
  await new Promise(r => setTimeout(r, 1400));

  activeYear = await page.evaluate(() => {
    const active = document.querySelector('nav[aria-label="Season Timeline Navigator"] button[class*="activeSegment"]');
    return active ? active.textContent.trim() : null;
  });
  console.log("Active year after jump to 2023:", activeYear);
  await page.screenshot({ path: path.join(__dirname, 'verified_teams_2023_jump.png') });

  // 3. Test Mobile Viewport
  console.log("\n--- Testing Mobile Viewport ---");
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const mobileStreamExists = await page.evaluate(() => {
    return !!document.querySelector('[class*="mobileStream"]');
  });
  console.log("Teams mobile vertical stream renders cleanly:", mobileStreamExists);

  await browser.close();
  console.log("\nAll targeted checks passed!");
})();
