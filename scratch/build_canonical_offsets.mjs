import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

const W = 1143;
const H = 839;

// Canonical reference cluster centers:
const centers = {
  'Top Class (LMP1/Hypercar)': { x: 402.0, y: 361.0 },
  'LMP2': { x: 737.0, y: 359.0 },
  'GT (GTE Pro/Am)': { x: 569.0, y: 576.0 },
  'Experimental': { x: 284.0, y: 603.4 },
};

let seed = 42;
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
  .force('x', d3.forceX(d => centers[d.class].x).strength(0.085))
  .force('y', d3.forceY(d => centers[d.class].y).strength(0.085))
  .force('collide', d3.forceCollide(d => {
    if (d.class === 'GT (GTE Pro/Am)') return 5.8;
    if (d.class === 'Top Class (LMP1/Hypercar)') return 5.8;
    if (d.class === 'LMP2') return 5.7;
    return 5.8;
  }).iterations(2))
  .stop();

console.log('Running 150 ticks simulation...');
for (let i = 0; i < 150; i++) sim.tick(1);

// Verify distances between classes:
const topPts = data.filter(d => d.class === 'Top Class (LMP1/Hypercar)');
const lmpPts = data.filter(d => d.class === 'LMP2');
const gtPts = data.filter(d => d.class === 'GT (GTE Pro/Am)');
const expPts = data.filter(d => d.class === 'Experimental');

let minTopLmp = Infinity;
for (const t of topPts) {
  for (const l of lmpPts) {
    const d = Math.hypot(t.x - l.x, t.y - l.y);
    if (d < minTopLmp) minTopLmp = d;
  }
}
let minTopGt = Infinity;
for (const t of topPts) {
  for (const g of gtPts) {
    const d = Math.hypot(t.x - g.x, t.y - g.y);
    if (d < minTopGt) minTopGt = d;
  }
}
let minLmpGt = Infinity;
for (const l of lmpPts) {
  for (const g of gtPts) {
    const d = Math.hypot(l.x - g.x, l.y - g.y);
    if (d < minLmpGt) minLmpGt = d;
  }
}

console.log('Min particle distance Top - LMP2:', minTopLmp.toFixed(2), 'px');
console.log('Min particle distance Top - GT:', minTopGt.toFixed(2), 'px');
console.log('Min particle distance LMP2 - GT:', minLmpGt.toFixed(2), 'px');

// Measure bounding boxes
const allX = data.map(d => d.x);
const allY = data.map(d => d.y);
const minX = Math.min(...allX);
const maxX = Math.max(...allX);
const minY = Math.min(...allY);
const maxY = Math.max(...allY);
console.log(`Overall Composition Bounding Box: X=[${minX.toFixed(1)}, ${maxX.toFixed(1)}] (W=${(maxX - minX).toFixed(1)}), Y=[${minY.toFixed(1)}, ${maxY.toFixed(1)}] (H=${(maxY - minY).toFixed(1)})`);

// Build offsets relative to each cluster's center
const offsets = {};
Object.keys(ds.classes).forEach(cls => {
  offsets[cls] = [];
});

data.forEach(d => {
  const c = centers[d.class];
  offsets[d.class].push([
    parseFloat((d.x - c.x).toFixed(2)),
    parseFloat((d.y - c.y).toFixed(2))
  ]);
});

// Write to web/src/data/scatter_cluster_offsets.json
const destPath = path.join(__dirname, '../web/src/data/scatter_cluster_offsets.json');
fs.writeFileSync(destPath, JSON.stringify(offsets));
console.log(`Successfully wrote canonical offsets to ${destPath}`);

// Also render SVG for side-by-side comparison
const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.88)'
};
const radii = {
  'Top Class (LMP1/Hypercar)': 4.4,
  'LMP2': 4.4,
  'GT (GTE Pro/Am)': 4.2,
  'Experimental': 4.4
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${radii[d.class]}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'test_canonical_layout.svg'), svg);
console.log('Saved scratch/test_canonical_layout.svg');
