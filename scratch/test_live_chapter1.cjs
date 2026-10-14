const puppeteer = require('../web/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  console.log('Navigating to http://localhost:5173/WEC-Analysis-2026/#story ...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const chapter01 = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + st, height: el.offsetHeight };
  });

  if (!chapter01) {
    console.error('Could not find #chapter-01');
    await browser.close();
    return;
  }

  // Scroll to settled clustered state (approx 45% into Chapter 1)
  const targetY = chapter01.top + chapter01.height * 0.45;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), targetY);
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture desktop settled screenshot
  const desktopShotPath = path.resolve(__dirname, 'live_desktop_settled.png');
  await page.screenshot({ path: desktopShotPath });
  console.log('Saved scratch/live_desktop_settled.png');

  // Also capture the canvas alone
  const canvasBox = await page.evaluate(() => {
    const c = document.querySelector('#chapter-01 canvas');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });
  console.log('Canvas Box:', canvasBox);

  // 2. Test hovering over each primary cluster dynamically:
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

  const clusterPositions = await page.evaluate(() => {
    const ch = document.getElementById('chapter-01');
    const touchGroups = ch.querySelectorAll('g[role="button"]');
    const res = {};
    touchGroups.forEach(g => {
      const label = g.getAttribute('aria-label');
      const transform = g.getAttribute('transform');
      const match = transform ? transform.match(/translate\(([^,]+),\s*([^)]+)\)/) : null;
      if (match) {
        res[label.replace('Inspect ', '')] = { x: parseFloat(match[1]), y: parseFloat(match[2]) };
      }
    });
    return res;
  });
  console.log('Runtime Cluster Centers:', clusterPositions);

  const topCenter = clusterPositions['Top Class (LMP1/Hypercar)'];
  const lmpCenter = clusterPositions['LMP2'];
  const gtCenter = clusterPositions['GT (GTE Pro/Am)'];
  const expCenter = clusterPositions['Experimental'];

  // Hover Top Class
  await page.mouse.move(canvasBox.left + topCenter.x, canvasBox.top + topCenter.y);
  await new Promise(r => setTimeout(r, 400));
  let labelTop = await getActiveLabel();
  console.log('Hover Top Class:', labelTop);
  await page.screenshot({ path: path.resolve(__dirname, 'live_hover_topclass.png') });

  // Hover LMP2
  await page.mouse.move(canvasBox.left + lmpCenter.x, canvasBox.top + lmpCenter.y);
  await new Promise(r => setTimeout(r, 400));
  let labelLmp = await getActiveLabel();
  console.log('Hover LMP2:', labelLmp);
  await page.screenshot({ path: path.resolve(__dirname, 'live_hover_lmp2.png') });

  // Hover GT
  await page.mouse.move(canvasBox.left + gtCenter.x, canvasBox.top + gtCenter.y);
  await new Promise(r => setTimeout(r, 400));
  let labelGt = await getActiveLabel();
  console.log('Hover GT:', labelGt);
  await page.screenshot({ path: path.resolve(__dirname, 'live_hover_gt.png') });

  // Hover Experimental
  await page.mouse.move(canvasBox.left + expCenter.x, canvasBox.top + expCenter.y);
  await new Promise(r => setTimeout(r, 400));
  let labelExp = await getActiveLabel();
  console.log('Hover Experimental:', labelExp);
  await page.screenshot({ path: path.resolve(__dirname, 'live_hover_exp.png') });

  // Hover in the GAP between Top Class and LMP2 (narrow channel of negative space)
  const gapX = (topCenter.x + 145 * 1.15 + lmpCenter.x - 168 * 1.15) / 2;
  const gapY = topCenter.y - 30;
  await page.mouse.move(canvasBox.left + gapX, canvasBox.top + gapY);
  await new Promise(r => setTimeout(r, 400));
  let labelGap = await getActiveLabel();
  console.log('Hover GAP between Top Class & LMP2 (should be null):', labelGap);
  await page.screenshot({ path: path.resolve(__dirname, 'live_hover_gap.png') });

  // Hover outside in narrative
  await page.mouse.move(canvasBox.left + canvasBox.width + 100, canvasBox.top + 200);
  await new Promise(r => setTimeout(r, 400));
  let labelOutside = await getActiveLabel();
  console.log('Hover outside (should be null):', labelOutside);

  // 3. Test Mobile Viewport (390 x 844)
  console.log('\nTesting Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const mobileChapter01 = await page.evaluate(() => {
    const el = document.getElementById('chapter-01');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + st, height: el.offsetHeight };
  });

  const mobileTargetY = mobileChapter01.top + mobileChapter01.height * 0.45;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), mobileTargetY);
  await new Promise(r => setTimeout(r, 1200));

  const mobileShotPath = path.resolve(__dirname, 'live_mobile_settled.png');
  await page.screenshot({ path: mobileShotPath });
  console.log('Saved scratch/live_mobile_settled.png');

  await browser.close();

  // 4. Generate comparison image against reference
  const pyCode = `
from PIL import Image
ref = Image.open('web/references/scatter-scaled-approved.png')
cur = Image.open('scratch/live_desktop_settled.png')

# Crop canvas region from cur
# Canvas is on the left
w_crop = int(cur.width * 0.60)
h_crop = cur.height
cur_cropped = cur.crop((0, 0, w_crop, h_crop))

# Resize cur_cropped to match ref height
scale_h = ref.height / cur_cropped.height
w_scaled = int(cur_cropped.width * scale_h)
cur_scaled = cur_cropped.resize((w_scaled, ref.height), Image.Resampling.LANCZOS)

comp = Image.new('RGB', (ref.width + w_scaled, ref.height))
comp.paste(ref, (0, 0))
comp.paste(cur_scaled, (ref.width, 0))
comp.save('scratch/compare_live_vs_approved.png')
print('Saved scratch/compare_live_vs_approved.png')
  `;
  fs.writeFileSync('scratch/make_live_comp.py', pyCode);
  execSync('python scratch/make_live_comp.py', { stdio: 'inherit' });
})();
