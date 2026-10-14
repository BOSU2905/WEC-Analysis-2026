const fs = require('fs');
const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));
const datasetScale = require('../web/src/data/dataset_scale.json');

const counts = datasetScale.classes;
const classScaleMultipliers = {
  'Top Class (LMP1/Hypercar)': 1.15,
  'LMP2': 1.0,
  'GT (GTE Pro/Am)': 0.90,
  'Experimental': 1.25,
};
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

async function renderOption(targetGap, filename) {
  const width = 864, height = 780;
  const availW = Math.min(width * 0.72, 540);
  const availH = Math.min(height * 0.72, 580);
  const baseDotRadius = 2.4;

  const c = Math.min(availW / 116.0, availH / 130.0);

  // Exact outer dot radius for sunflower packing
  const rTop = Math.sqrt(counts['Top Class (LMP1/Hypercar)']) * c + baseDotRadius * classScaleMultipliers['Top Class (LMP1/Hypercar)'];
  const rLmp2 = Math.sqrt(counts['LMP2']) * c + baseDotRadius * classScaleMultipliers['LMP2'];
  const rGt = Math.sqrt(counts['GT (GTE Pro/Am)']) * c + baseDotRadius * classScaleMultipliers['GT (GTE Pro/Am)'];

  const d12 = rTop + rLmp2 + targetGap;
  const d13 = rTop + rGt + targetGap;
  const d23 = rLmp2 + rGt + targetGap;

  const x1 = 0, y1 = 0;
  const x2 = d12, y2 = 0;
  const x3 = d12 / 2 + (d13 * d13 - d23 * d23) / (2 * d12);
  const y3 = Math.sqrt(Math.max(0, d13 * d13 - (x3 - x1) * (x3 - x1)));

  const minX = Math.min(x1 - rTop, x3 - rGt);
  const maxX = Math.max(x2 + rLmp2, x3 + rGt);
  const minY = Math.min(y1 - rTop, y2 - rLmp2);
  const maxY = y3 + rGt;

  const targetCX = width * 0.50;
  const targetCY = height * 0.48;

  const offsetX = targetCX - (minX + maxX) / 2;
  const offsetY = targetCY - (minY + maxY) / 2;

  const centers = {
    'Top Class (LMP1/Hypercar)': { x: x1 + offsetX, y: y1 + offsetY },
    'LMP2': { x: x2 + offsetX, y: y2 + offsetY },
    'GT (GTE Pro/Am)': { x: x3 + offsetX, y: y3 + offsetY }
  };

  const expR = Math.sqrt(counts['Experimental']) * c + baseDotRadius * classScaleMultipliers['Experimental'];
  const expX = centers['GT (GTE Pro/Am)'].x - rGt - expR - 22;
  const expY = centers['GT (GTE Pro/Am)'].y + rGt * 0.20;
  centers['Experimental'] = { x: expX, y: expY };

  const classIndices = {};
  const dots = [];

  Object.entries(counts).forEach(([className, count]) => {
    for (let i = 0; i < count; i++) {
      const classIdx = classIndices[className] || 0;
      classIndices[className] = classIdx + 1;

      const center = centers[className];
      const baseR = Math.sqrt(classIdx) * c;
      const theta = classIdx * GOLDEN_ANGLE;
      const harmonic = 1 + 0.04 * Math.sin(theta * 3) * Math.cos(theta * 2);
      const r = baseR * harmonic;

      const cx = center.x + r * Math.cos(theta);
      const cy = center.y + r * Math.sin(theta);
      const dotRadius = baseDotRadius * classScaleMultipliers[className];

      dots.push({
        class: className,
        x: cx,
        y: cy,
        radius: dotRadius
      });
    }
  });

  let minClear = Infinity;
  let minClasses = '';
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      if (dots[i].class === dots[j].class) continue;
      const clear = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y) - (dots[i].radius + dots[j].radius);
      if (clear < minClear) {
        minClear = clear;
        minClasses = dots[i].class + ' <-> ' + dots[j].class;
      }
    }
  }
  console.log(`targetGap=${targetGap} -> minClear=${minClear.toFixed(2)}px (${minClasses})`);

  const colors = {
    'Top Class (LMP1/Hypercar)': '#e8e7e3',
    'LMP2': '#92918d',
    'GT (GTE Pro/Am)': '#8b7d6b', // warm grey / bronze
    'Experimental': '#a855f7'
  };

  let dotElements = '';
  dots.forEach(d => {
    dotElements += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${d.radius.toFixed(1)}" fill="${colors[d.class]}" opacity="0.8" />\n`;
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#0e0f11;">
    ${dotElements}
  </svg>`;
  fs.writeFileSync(path.resolve(__dirname, `${filename}.svg`), svg);
}

(async () => {
  await renderOption(2.0, 'test_gap_2');
  await renderOption(0.0, 'test_gap_0');
  await renderOption(-4.0, 'test_gap_neg4');
  await renderOption(-8.0, 'test_gap_neg8');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 864, height: 780 });

  for (const name of ['test_gap_2', 'test_gap_0', 'test_gap_neg4', 'test_gap_neg8']) {
    await page.goto('file:///' + path.resolve(__dirname, `${name}.svg`).replace(/\\/g, '/'));
    await page.screenshot({ path: path.resolve(__dirname, `${name}.png`) });
    console.log(`Saved scratch/${name}.png`);
  }
  await browser.close();
})();
