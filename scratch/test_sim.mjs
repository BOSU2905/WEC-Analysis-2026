import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const datasetScale = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

const W = 863;
const H = 780;

const clusters = {
  'Top Class (LMP1/Hypercar)': { x: W * 0.35, y: H * 0.40 },
  'LMP2': { x: W * 0.65, y: H * 0.40 },
  'GT (GTE Pro/Am)': { x: W * 0.50, y: H * 0.65 },
  'Experimental': { x: W * 0.25, y: H * 0.70 },
};

const data = [];
Object.entries(datasetScale.classes).forEach(([className, count]) => {
  for (let i = 0; i < count; i++) {
    data.push({
      id: `${className}-${i}`,
      class: className,
      x: W / 2,
      y: H / 2,
    });
  }
});

const padding = 2;
const safeArea = W * H;
const maxRadius = Math.max(1, Math.floor(Math.sqrt(safeArea / data.length) / 2) - padding);
const radius = Math.min(maxRadius, 8);
console.log('computed radius:', radius);

const t0 = Date.now();
const sim = d3.forceSimulation(data)
  .force('x', d3.forceX(d => clusters[d.class].x).strength(0.15))
  .force('y', d3.forceY(d => clusters[d.class].y).strength(0.15))
  .force('collide', d3.forceCollide(radius + 1).iterations(2))
  .stop();

for (let i = 0; i < 100; i++) sim.tick(1);
console.log('100 ticks took:', Date.now() - t0, 'ms');

const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.88)'
};
const multipliers = {
  'Top Class (LMP1/Hypercar)': 1.15,
  'LMP2': 1.0,
  'GT (GTE Pro/Am)': 0.90,
  'Experimental': 1.25,
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  const r = radius * (multipliers[d.class] || 1);
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${r.toFixed(1)}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'force_sim_check.svg'), svg);
console.log('Saved scratch/force_sim_check.svg');
