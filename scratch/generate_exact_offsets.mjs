import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

// Canonical reference resolution: 1143 x 839 (matching web/references/scatter-scaled-approved.png)
const W = 1143;
const H = 839;

const centers = {
  'Top Class (LMP1/Hypercar)': { x: 394.5, y: 360.3 },
  'LMP2': { x: 730.5, y: 377.3 },
  'GT (GTE Pro/Am)': { x: 568.8, y: 576.1 },
  'Experimental': { x: 283.9, y: 603.4 },
};

let seed = 12345;
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
  .force('x', d3.forceX(d => centers[d.class].x).strength(0.095))
  .force('y', d3.forceY(d => centers[d.class].y).strength(0.095))
  .force('collide', d3.forceCollide(d => (d.class === 'GT (GTE Pro/Am)' ? 5.3 : 5.85)).iterations(2))
  .stop();

console.log('Running simulation...');
for (let i = 0; i < 150; i++) sim.tick(1);

// Generate SVG for inspection
const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.88)'
};
const radii = {
  'Top Class (LMP1/Hypercar)': 5.1,
  'LMP2': 5.0,
  'GT (GTE Pro/Am)': 4.7,
  'Experimental': 5.0
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${radii[d.class]}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'test_refined_sim.svg'), svg);
console.log('Saved scratch/test_refined_sim.svg');

// Also compute normalized offsets relative to cluster center:
// dx = (x - center.x) / W_ref
// dy = (y - center.y) / H_ref
// And per-class offsets:
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

fs.writeFileSync(path.join(__dirname, 'scatter_cluster_offsets.json'), JSON.stringify(offsets));
console.log('Saved scratch/scatter_cluster_offsets.json');
