import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

// Exact canvas dimensions in desktop 1440x900 viewport:
const W = 863;
const H = 780;

const centers = {
  'Top Class (LMP1/Hypercar)': { x: W * 0.345, y: H * 0.430 },
  'LMP2': { x: W * 0.637, y: H * 0.425 },
  'GT (GTE Pro/Am)': { x: W * 0.498, y: H * 0.688 },
  'Experimental': { x: W * 0.248, y: H * 0.719 },
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
      x: centers[className].x + (pseudoRandom() - 0.5) * 40,
      y: centers[className].y + (pseudoRandom() - 0.5) * 40,
    });
  }
});

const sim = d3.forceSimulation(data)
  .force('x', d3.forceX(d => centers[d.class].x).strength(0.12))
  .force('y', d3.forceY(d => centers[d.class].y).strength(0.12))
  .force('collide', d3.forceCollide(d => (d.class === 'GT (GTE Pro/Am)' ? 4.2 : 4.5)).iterations(2))
  .stop();

const t0 = Date.now();
for (let i = 0; i < 120; i++) sim.tick(1);
console.log('120 ticks took:', Date.now() - t0, 'ms');

const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.88)'
};
const radii = {
  'Top Class (LMP1/Hypercar)': 4.2,
  'LMP2': 4.0,
  'GT (GTE Pro/Am)': 3.8,
  'Experimental': 4.2
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${radii[d.class]}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'test_desktop_sim.svg'), svg);
console.log('Saved scratch/test_desktop_sim.svg');
