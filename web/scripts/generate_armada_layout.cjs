const fs = require('fs');
const path = require('path');
const d3 = require('d3');

const csvPath = path.join(__dirname, '../src/data/entry_dots.csv');
const raw = fs.readFileSync(csvPath, 'utf8');
const data = d3.csvParse(raw);

const MAIN_TEAMS = [
  'AF Corse',
  'Aston Martin Racing',
  'Toyota Gazoo Racing',
  'Rebellion Racing',
  'Audi Sport Team Joest',
  'Porsche GT Team',
];

function runDeterministicSimulation(width, height, isMobile) {
  // LCG seeded PRNG for absolute determinism
  let seed = 123456789;
  function random() {
    seed = (1103515245 * seed + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }

  const clusters = isMobile
    ? {
        'AF Corse': { x: width * 0.3, y: height * 0.25 },
        'Aston Martin Racing': { x: width * 0.7, y: height * 0.25 },
        'Toyota Gazoo Racing': { x: width * 0.5, y: height * 0.45 },
        'Porsche GT Team': { x: width * 0.3, y: height * 0.65 },
        'Audi Sport Team Joest': { x: width * 0.7, y: height * 0.65 },
        'Rebellion Racing': { x: width * 0.5, y: height * 0.8 },
        Other: { x: width * 0.5, y: height * 0.5 },
      }
    : {
        'AF Corse': { x: width * 0.25, y: height * 0.35 },
        'Aston Martin Racing': { x: width * 0.75, y: height * 0.35 },
        'Toyota Gazoo Racing': { x: width * 0.5, y: height * 0.3 },
        'Porsche GT Team': { x: width * 0.25, y: height * 0.65 },
        'Audi Sport Team Joest': { x: width * 0.75, y: height * 0.65 },
        'Rebellion Racing': { x: width * 0.5, y: height * 0.7 },
        Other: { x: width * 0.5, y: height * 0.5 },
      };

  const nodes = data.map((d, i) => {
    const teamGroup = MAIN_TEAMS.includes(d.team) ? d.team : 'Other';
    return {
      id: i,
      team: teamGroup,
      x: width / 2 + (random() - 0.5) * 80,
      y: height / 2 + (random() - 0.5) * 80,
    };
  });

  const padding = 2;
  const safeArea = width * height;
  const maxRadius = Math.max(
    1,
    Math.floor(Math.sqrt(safeArea / nodes.length) / 2) - padding,
  );
  const radius = Math.min(maxRadius, 8);

  // 1. Initial simulation: clump loosely in center
  const simStart = d3
    .forceSimulation(nodes)
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))
    .force('collide', d3.forceCollide(radius + 0.5).iterations(2))
    .stop();

  for (let i = 0; i < 100; i++) {
    simStart.tick();
  }

  const startCoords = nodes.map(n => ({ sx: n.x, sy: n.y }));

  // 2. Target simulation: attract towards respective cluster
  const simTarget = d3
    .forceSimulation(nodes)
    .force(
      'x',
      d3
        .forceX(d => clusters[d.team].x)
        .strength(0.2),
    )
    .force(
      'y',
      d3
        .forceY(d => clusters[d.team].y)
        .strength(0.2),
    )
    .force('collide', d3.forceCollide(radius + 1).iterations(2))
    .stop();

  for (let i = 0; i < 150; i++) {
    simTarget.tick();
  }

  // Return normalized coordinates [sx, sy, tx, ty]
  return nodes.map((n, i) => [
    +(startCoords[i].sx / width).toFixed(4),
    +(startCoords[i].sy / height).toFixed(4),
    +(n.x / width).toFixed(4),
    +(n.y / height).toFixed(4),
  ]);
}

console.log('Generating Armada layout...');
const desktop = runDeterministicSimulation(1000, 750, false);
const mobile = runDeterministicSimulation(400, 750, true);

// Pre-calculate groups and metadata to save runtime CPU
const teamCounts = {};
const gt = [];
const topClass = [];
const other = [];

data.forEach((d, i) => {
  const teamGroup = MAIN_TEAMS.includes(d.team) ? d.team : 'Other';
  teamCounts[teamGroup] = (teamCounts[teamGroup] || 0) + 1;
  if (teamGroup === 'AF Corse' || teamGroup === 'Aston Martin Racing') {
    gt.push(i);
  } else if (
    teamGroup === 'Toyota Gazoo Racing' ||
    teamGroup === 'Audi Sport Team Joest' ||
    teamGroup === 'Porsche GT Team' ||
    teamGroup === 'Rebellion Racing'
  ) {
    topClass.push(i);
  } else {
    other.push(i);
  }
});

const outObj = {
  count: data.length,
  teamCounts,
  groups: { gt, topClass, other },
  desktop,
  mobile,
};

const outputPath = path.join(__dirname, '../src/data/armada_layout.json');
fs.writeFileSync(outputPath, JSON.stringify(outObj));
console.log('Successfully wrote layout to', outputPath);
console.log('File size:', (fs.statSync(outputPath).size / 1024).toFixed(1), 'KB');
