const d3 = require('./web/node_modules/d3');
const fs = require('fs');
const datasetScale = JSON.parse(fs.readFileSync('web/src/data/dataset_scale.json', 'utf8'));

// Inspect actual canvas width and height from test_chapter01_cluster.cjs
// In 1440x900, the left sticky panel is ~648px wide, height ~836px
const width = 648;
const height = 836;

const clusters = {
  'Top Class (LMP1/Hypercar)': { x: width * 0.35, y: height * 0.4 },
  'LMP2': { x: width * 0.65, y: height * 0.4 },
  'GT (GTE Pro/Am)': { x: width * 0.5, y: height * 0.65 },
  'Experimental': { x: width * 0.25, y: height * 0.7 },
};

const data = [];
Object.entries(datasetScale.classes).forEach(([className, count]) => {
  for (let i = 0; i < count; i++) {
    data.push({
      id: `${className}-${i}`,
      class: className,
      x: width / 2,
      y: height / 2,
    });
  }
});

const padding = 2;
const safeArea = width * height;
const maxRadius = Math.max(1, Math.floor(Math.sqrt(safeArea / data.length) / 2) - padding);
const radius = Math.min(maxRadius, 8);

console.log('radius:', radius, 'dots:', data.length);

const sim = d3.forceSimulation(data)
  .force('x', d3.forceX(d => clusters[d.class].x).strength(0.15))
  .force('y', d3.forceY(d => clusters[d.class].y).strength(0.15))
  .force('collide', d3.forceCollide(radius + 1).iterations(2))
  .stop();

for (let i = 0; i < 100; i++) {
  sim.tick(1);
}

const colors = {
  'Top Class (LMP1/Hypercar)': 'rgb(94, 234, 212)',
  'LMP2': 'rgb(96, 165, 250)',
  'GT (GTE Pro/Am)': 'rgb(251, 191, 36)',
  'Experimental': 'rgb(163, 230, 53)'
};

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background:#0b0c0e">\n`;
data.forEach(d => {
  svg += `  <circle cx="${d.x.toFixed(2)}" cy="${d.y.toFixed(2)}" r="${radius}" fill="${colors[d.class]}" opacity="0.8"/>\n`;
});
svg += `</svg>`;

fs.writeFileSync('scratch/sim_result.svg', svg);
console.log('Saved scratch/sim_result.svg');
