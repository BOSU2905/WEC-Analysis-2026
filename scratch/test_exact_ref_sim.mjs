import * as d3 from '../web/node_modules/d3/src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ds = JSON.parse(fs.readFileSync(path.join(__dirname, '../web/src/data/dataset_scale.json'), 'utf8'));

const W = 1143;
const H = 839;

const centers = {
  'Top Class (LMP1/Hypercar)': { x: 394, y: 361 },
  'LMP2': { x: 728, y: 356 },
  'GT (GTE Pro/Am)': { x: 569, y: 585 },
  'Experimental': { x: 284, y: 603 },
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
  .force('x', d3.forceX(d => centers[d.class].x).strength(0.09))
  .force('y', d3.forceY(d => centers[d.class].y).strength(0.09))
  .force('collide', d3.forceCollide(d => (d.class === 'GT (GTE Pro/Am)' ? 5.2 : 5.8)).iterations(2))
  .stop();

for (let i = 0; i < 140; i++) sim.tick(1);

const colors = {
  'Top Class (LMP1/Hypercar)': 'rgba(101, 152, 168, 0.78)',
  'LMP2': 'rgba(113, 143, 168, 0.78)',
  'GT (GTE Pro/Am)': 'rgba(182, 161, 111, 0.78)',
  'Experimental': 'rgba(137, 159, 130, 0.88)'
};
const radii = {
  'Top Class (LMP1/Hypercar)': 4.8,
  'LMP2': 4.8,
  'GT (GTE Pro/Am)': 4.5,
  'Experimental': 4.8
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  svg += `  <circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${radii[d.class]}" fill="${colors[d.class]}"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync(path.join(__dirname, 'test_exact_ref_sim.svg'), svg);
console.log('Saved scratch/test_exact_ref_sim.svg');
