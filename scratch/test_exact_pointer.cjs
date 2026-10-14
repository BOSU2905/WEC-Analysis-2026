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

  // Get actual cluster centers and canvas bounding box
  const info = await page.evaluate(() => {
    const canvas = document.querySelector('#chapter-01 canvas');
    const cb = canvas.getBoundingClientRect();
    const touchGroups = document.querySelectorAll('#chapter-01 svg g[data-class]');
    const centers = {};
    touchGroups.forEach(g => {
      const cls = g.getAttribute('data-class');
      const tr = g.getAttribute('transform');
      const m = tr ? tr.match(/translate\(([^,]+),\s*([^)]+)\)/) : null;
      if (m) centers[cls] = { x: parseFloat(m[1]), y: parseFloat(m[2]) };
    });
    return { cb: { left: cb.left, top: cb.top, width: cb.width, height: cb.height }, centers };
  });

  console.log('Detected centers:', info.centers);

  async function getActiveLabels() {
    return await page.evaluate(() => {
      const labels = document.querySelectorAll('#chapter-01 svg g.label-group');
      const list = [];
      labels.forEach(g => {
        const op = parseFloat(window.getComputedStyle(g).opacity || '0');
        const cls = g.getAttribute('data-class');
        const txt = Array.from(g.querySelectorAll('text')).map(t => t.textContent.trim()).join(' | ');
        if (op > 0.1) list.push({ cls, op, txt });
      });
      return list;
    });
  }

  async function hoverAt(canvasX, canvasY, label) {
    await page.mouse.move(info.cb.left + canvasX, info.cb.top + canvasY);
    await new Promise(r => setTimeout(r, 450));
    const active = await getActiveLabels();
    console.log(`[${label}] at (${canvasX.toFixed(1)}, ${canvasY.toFixed(1)}) -> active:`, active);
    return active;
  }

  // 1. Center tests
  const topC = info.centers["Top Class (LMP1/Hypercar)"];
  const lmp2C = info.centers["LMP2"];
  const gtC = info.centers["GT (GTE Pro/Am)"];
  const expC = info.centers["Experimental"];

  await hoverAt(topC.x, topC.y, "Top Class Center");
  await hoverAt(lmp2C.x, lmp2C.y, "LMP2 Center");
  await hoverAt(gtC.x, gtC.y, "GT Center");
  await hoverAt(expC.x, expC.y, "Experimental Center");

  // 2. Outer edge tests (5px inside outer radius)
  // Top Class radius ~ 118 -> top edge at (topC.x, topC.y - 110)
  await hoverAt(topC.x, topC.y - 105, "Top Class Top Edge");
  // Top Class left edge at (topC.x - 105, topC.y)
  await hoverAt(topC.x - 105, topC.y, "Top Class Left Edge");

  // LMP2 radius ~ 145 -> right edge at (lmp2C.x + 135, lmp2C.y)
  await hoverAt(lmp2C.x + 135, lmp2C.y, "LMP2 Right Edge");
  // LMP2 top edge at (lmp2C.x, lmp2C.y - 135)
  await hoverAt(lmp2C.x, lmp2C.y - 135, "LMP2 Top Edge");

  // GT radius ~ 174 -> bottom edge at (gtC.x, gtC.y + 160)
  await hoverAt(gtC.x, gtC.y + 160, "GT Bottom Edge");
  // GT right edge at (gtC.x + 160, gtC.y)
  await hoverAt(gtC.x + 160, gtC.y, "GT Right Edge");

  // 3. Move across boundary between Top Class and LMP2
  console.log('\n--- Crossing Top Class <-> LMP2 touching boundary ---');
  for (let x = topC.x; x <= lmp2C.x; x += (lmp2C.x - topC.x) / 10) {
    await hoverAt(x, topC.y, `Boundary Top-LMP2`);
  }

  // 4. Move across boundary between Top Class and GT
  console.log('\n--- Crossing Top Class <-> GT touching boundary ---');
  for (let t = 0; t <= 1; t += 0.2) {
    const x = topC.x + (gtC.x - topC.x) * t;
    const y = topC.y + (gtC.y - topC.y) * t;
    await hoverAt(x, y, `Boundary Top-GT (t=${t.toFixed(1)})`);
  }

  // 5. Move across boundary between LMP2 and GT
  console.log('\n--- Crossing LMP2 <-> GT touching boundary ---');
  for (let t = 0; t <= 1; t += 0.2) {
    const x = lmp2C.x + (gtC.x - lmp2C.x) * t;
    const y = lmp2C.y + (gtC.y - lmp2C.y) * t;
    await hoverAt(x, y, `Boundary LMP2-GT (t=${t.toFixed(1)})`);
  }

  // 6. Empty space 30px outside Top Class top edge
  await hoverAt(topC.x, topC.y - 150, "Empty Space Above Top Class");

  // 7. Empty space far left
  await hoverAt(30, 200, "Empty Space Far Left");

  // 8. Outside canvas into narrative
  await page.mouse.move(1100, 400);
  await new Promise(r => setTimeout(r, 450));
  const narrativeActive = await getActiveLabels();
  console.log('[Narrative Outside] active:', narrativeActive);

  await browser.close();
})();
