import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

const W = 1143;
const H = 839;

const centers = {
  'Top Class (LMP1/Hypercar)': { x: 394.8, y: 361.6 },
  'LMP2': { x: 747.5, y: 359.3 },
  'GT (GTE Pro/Am)': { x: 568.8, y: 576.2 },
  'Experimental': { x: 284.0, y: 603.4 },
};

function runTest(collideR_top, collideR_lmp, collideR_gt, strength, ticks, seedVal) {
  let seed = seedVal;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  const data = [];
  Object.entries(ds.classes).forEach(([className, count]) => {
    for (let i = 0; i < count; i++) {
      data.push({
        id: `${className}-${i}`,
        class: className,
        x: centers[className].x + (pseudoRandom() - 0.5) * 60,
        y: centers[className].y + (pseudoRandom() - 0.5) * 60,
      });
    }
  });

  const sim = d3.forceSimulation(data)
    .force('x', d3.forceX(d => centers[d.class].x).strength(strength))
    .force('y', d3.forceY(d => centers[d.class].y).strength(strength))
    .force('collide', d3.forceCollide(d => {
      if (d.class === 'GT (GTE Pro/Am)') return collideR_gt;
      if (d.class === 'Top Class (LMP1/Hypercar)') return collideR_top;
      return collideR_lmp;
    }).iterations(2))
    .stop();

  for (let i = 0; i < ticks; i++) sim.tick(1);

  // Measure bounds
  const getBounds = (cls) => {
    const pts = data.filter(d => d.class === cls);
    const xs = pts.map(p => p.x);
    const ys = pts.map(p => p.y);
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
      cx: (Math.min(...xs) + Math.max(...xs)) / 2,
      cy: (Math.min(...ys) + Math.max(...ys)) / 2,
    };
  };

  const bTop = getBounds('Top Class (LMP1/Hypercar)');
  const bLmp = getBounds('LMP2');
  const bGt = getBounds('GT (GTE Pro/Am)');
  const bExp = getBounds('Experimental');

  const allX = data.map(d => d.x);
  const allY = data.map(d => d.y);
  const totalW = Math.max(...allX) - Math.min(...allX);
  const totalH = Math.max(...allY) - Math.min(...allY);

  // Check closest distance between Top and LMP
  const topPts = data.filter(d => d.class === 'Top Class (LMP1/Hypercar)');
  const lmpPts = data.filter(d => d.class === 'LMP2');
  const gtPts = data.filter(d => d.class === 'GT (GTE Pro/Am)');

  let minTopLmp = Infinity;
  for (const t of topPts) {
    if (t.x < 480) continue;
    for (const l of lmpPts) {
      if (l.x > 650) continue;
      const d = Math.hypot(t.x - l.x, t.y - l.y);
      if (d < minTopLmp) minTopLmp = d;
    }
  }

  let minTopGt = Infinity;
  for (const t of topPts) {
    if (t.y < 400) continue;
    for (const g of gtPts) {
      if (g.y > 550) continue;
      const d = Math.hypot(t.x - g.x, t.y - g.y);
      if (d < minTopGt) minTopGt = d;
    }
  }

  let minLmpGt = Infinity;
  for (const l of lmpPts) {
    if (l.y < 400) continue;
    for (const g of gtPts) {
      if (g.y > 550) continue;
      const d = Math.hypot(l.x - g.x, l.y - g.y);
      if (d < minLmpGt) minLmpGt = d;
    }
  }

  return {
    params: { collideR_top, collideR_lmp, collideR_gt, strength, ticks, seedVal },
    totalW: totalW.toFixed(1),
    totalH: totalH.toFixed(1),
    topW: bTop.w.toFixed(1),
    topH: bTop.h.toFixed(1),
    lmpW: bLmp.w.toFixed(1),
    lmpH: bLmp.h.toFixed(1),
    gtW: bGt.w.toFixed(1),
    gtH: bGt.h.toFixed(1),
    minTopLmp: minTopLmp.toFixed(1),
    minTopGt: minTopGt.toFixed(1),
    minLmpGt: minLmpGt.toFixed(1),
    data
  };
}

console.log('Running test sweeps...');
const r1 = runTest(5.6, 5.6, 5.2, 0.09, 140, 12345);
console.log('Result 1 (5.6/5.6/5.2, str=0.09):', {
  totalW: r1.totalW, totalH: r1.totalH,
  top: `${r1.topW}x${r1.topH}`,
  lmp: `${r1.lmpW}x${r1.lmpH}`,
  gt: `${r1.gtW}x${r1.gtH}`,
  minTopLmp: r1.minTopLmp,
  minTopGt: r1.minTopGt,
  minLmpGt: r1.minLmpGt
});

const r2 = runTest(5.8, 5.6, 5.1, 0.085, 150, 42);
console.log('Result 2 (5.8/5.6/5.1, str=0.085):', {
  totalW: r2.totalW, totalH: r2.totalH,
  top: `${r2.topW}x${r2.topH}`,
  lmp: `${r2.lmpW}x${r2.lmpH}`,
  gt: `${r2.gtW}x${r2.gtH}`,
  minTopLmp: r2.minTopLmp,
  minTopGt: r2.minTopGt,
  minLmpGt: r2.minLmpGt
});
