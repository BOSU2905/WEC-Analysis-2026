const fs = require('fs');
const d3 = require('./web/node_modules/d3');

const datasetScale = JSON.parse(fs.readFileSync('web/src/data/dataset_scale.json', 'utf8'));

const width = 864;
const height = 780;

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
      id: className + '-' + i,
      class: className,
      gridX: 0,
      gridY: 0,
      clusterX: 0,
      clusterY: 0,
    });
  }
});

const padding = 2;
const safeArea = width * height;
const maxRadius = Math.max(1, Math.floor(Math.sqrt(safeArea / data.length) / 2) - padding);
const radius = Math.min(maxRadius, 8);

const cols = Math.floor(Math.sqrt(data.length * (width / height)));
const rows = Math.ceil(data.length / cols);
const xOffset = (width - cols * (radius * 2 + padding)) / 2;
const yOffset = (height - rows * (radius * 2 + padding)) / 2;

data.forEach((d, i) => {
  d.gridX = xOffset + (i % cols) * (radius * 2 + padding);
  d.gridY = yOffset + Math.floor(i / cols) * (radius * 2 + padding);
  d.x = width / 2;
  d.y = height / 2;
});

const sim = d3.forceSimulation(data)
  .force('x', d3.forceX(d => clusters[d.class].x).strength(0.15))
  .force('y', d3.forceY(d => clusters[d.class].y).strength(0.15))
  .force('collide', d3.forceCollide(radius + 1).iterations(2))
  .stop();

for (let i = 0; i < 100; i++) {
  sim.tick(1);
}

data.forEach(d => {
  d.clusterX = Math.max(radius, Math.min(width - radius, d.x || 0));
  d.clusterY = Math.max(radius, Math.min(height - radius, d.y || 0));
});

console.log('radius:', radius);
console.log('Top Class bounds x:', Math.min(...data.filter(d => d.class.includes('Top')).map(d => d.clusterX)), Math.max(...data.filter(d => d.class.includes('Top')).map(d => d.clusterX)));
console.log('Top Class bounds y:', Math.min(...data.filter(d => d.class.includes('Top')).map(d => d.clusterY)), Math.max(...data.filter(d => d.class.includes('Top')).map(d => d.clusterY)));
console.log('LMP2 bounds x:', Math.min(...data.filter(d => d.class === 'LMP2').map(d => d.clusterX)), Math.max(...data.filter(d => d.class === 'LMP2').map(d => d.clusterX)));
console.log('LMP2 bounds y:', Math.min(...data.filter(d => d.class === 'LMP2').map(d => d.clusterY)), Math.max(...data.filter(d => d.class === 'LMP2').map(d => d.clusterY)));
console.log('GT bounds x:', Math.min(...data.filter(d => d.class.includes('GT')).map(d => d.clusterX)), Math.max(...data.filter(d => d.class.includes('GT')).map(d => d.clusterX)));
console.log('GT bounds y:', Math.min(...data.filter(d => d.class.includes('GT')).map(d => d.clusterY)), Math.max(...data.filter(d => d.class.includes('GT')).map(d => d.clusterY)));
console.log('Exp bounds x:', Math.min(...data.filter(d => d.class.includes('Exp')).map(d => d.clusterX)), Math.max(...data.filter(d => d.class.includes('Exp')).map(d => d.clusterX)));
console.log('Exp bounds y:', Math.min(...data.filter(d => d.class.includes('Exp')).map(d => d.clusterY)), Math.max(...data.filter(d => d.class.includes('Exp')).map(d => d.clusterY)));
