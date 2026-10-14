import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

const W = 864;
const H = 900;

// Shift GT up to 0.56 to interlock deeper into the upper saddle, matching reference
const centers = {
  'Top Class (LMP1/Hypercar)': { x: W * 0.34, y: H * 0.38 },
  'LMP2': { x: W * 0.63, y: H * 0.38 },
  'GT (GTE Pro/Am)': { x: W * 0.49, y: H * 0.56 },
  'Experimental': { x: W * 0.21, y: H * 0.69 },
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
      x: centers[className].x + (pseudoRandom() - 0.5) * 50,
      y: centers[className].y + (pseudoRandom() - 0.5) * 50,
    });
  }
});

const sim = d3.forceSimulation(data)
  .force('x', d3.forceX(d => centers[d.class].x).strength(0.075))
  .force('y', d3.forceY(d => centers[d.class].y).strength(0.075))
  .force('collide', d3.forceCollide(6.2).iterations(2))
  .stop();

for (let i = 0; i < 120; i++) sim.tick(1);

const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.90)'
};
const multipliers = {
  'Top Class (LMP1/Hypercar)': 1.15,
  'LMP2': 1.0,
  'GT (GTE Pro/Am)': 0.90,
  'Experimental': 1.25,
};
const baseDotR = 4.2;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  const r = baseDotR * (multipliers[d.class] || 1);
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${r.toFixed(1)}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'force_test_v6.svg'), svg);
console.log('Saved scratch/force_test_v6.svg');
