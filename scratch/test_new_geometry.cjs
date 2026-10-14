const fs = require('fs');
const path = require('path');

const datasetScale = require('../web/src/data/dataset_scale.json');

const counts = datasetScale.classes;
const classScaleMultipliers = {
  "Top Class (LMP1/Hypercar)": 1.15,
  "LMP2": 1.0,
  "GT (GTE Pro/Am)": 0.90,
  "Experimental": 1.25,
};

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function computeClustersAndLayout(width, height) {
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const availW = isMobile ? width * 0.78 : Math.min(width * 0.72, 540);
  const availH = isMobile ? height * 0.44 : Math.min(height * 0.72, 580);
  const gap = isMobile ? 4.0 : 6.0;
  const baseDotRadius = isMobile ? 1.6 : (isTablet ? 2.0 : 2.4);

  const c = Math.min(availW / 116.0, availH / 130.0);
  const harmonicMax = 1.05;

  const rTop = Math.sqrt(counts["Top Class (LMP1/Hypercar)"]) * c * harmonicMax + baseDotRadius * classScaleMultipliers["Top Class (LMP1/Hypercar)"];
  const rLmp2 = Math.sqrt(counts["LMP2"]) * c * harmonicMax + baseDotRadius * classScaleMultipliers["LMP2"];
  const rGt = Math.sqrt(counts["GT (GTE Pro/Am)"]) * c * harmonicMax + baseDotRadius * classScaleMultipliers["GT (GTE Pro/Am)"];

  const d12 = rTop + rLmp2 + gap;
  const d13 = rTop + rGt + gap;
  const d23 = rLmp2 + rGt + gap;

  const x1 = 0;
  const y1 = 0;
  const x2 = d12;
  const y2 = 0;

  const x3 = d12 / 2 + (d13 * d13 - d23 * d23) / (2 * d12);
  const y3 = Math.sqrt(Math.max(0, d13 * d13 - (x3 - x1) * (x3 - x1)));

  const minX = Math.min(x1 - rTop, x3 - rGt);
  const maxX = Math.max(x2 + rLmp2, x3 + rGt);
  const minY = Math.min(y1 - rTop, y2 - rLmp2);
  const maxY = y3 + rGt;

  const targetCX = width * 0.50;
  const targetCY = isMobile ? height * 0.38 : height * 0.48;

  const offsetX = targetCX - (minX + maxX) / 2;
  const offsetY = targetCY - (minY + maxY) / 2;

  const centers = {
    "Top Class (LMP1/Hypercar)": { x: x1 + offsetX, y: y1 + offsetY },
    "LMP2": { x: x2 + offsetX, y: y2 + offsetY },
    "GT (GTE Pro/Am)": { x: x3 + offsetX, y: y3 + offsetY }
  };

  const expR = Math.sqrt(counts["Experimental"]) * c * harmonicMax + baseDotRadius * classScaleMultipliers["Experimental"];
  const expX = centers["GT (GTE Pro/Am)"].x - rGt - expR - (isMobile ? 16 : 24);
  const expY = centers["GT (GTE Pro/Am)"].y + rGt * 0.20;
  centers["Experimental"] = { x: expX, y: expY };

  // Calculate dots
  const classIndices = {};
  const dots = [];

  Object.entries(counts).forEach(([className, count]) => {
    for (let i = 0; i < count; i++) {
      const classIdx = classIndices[className] || 0;
      classIndices[className] = classIdx + 1;

      const center = centers[className];
      const baseR = Math.sqrt(classIdx) * c;
      const theta = classIdx * GOLDEN_ANGLE;
      const harmonic = 1 + 0.05 * Math.sin(theta * 3) * Math.cos(theta * 2);
      const r = baseR * harmonic;

      const cx = center.x + r * Math.cos(theta);
      const cy = center.y + r * Math.sin(theta);
      const dotRadius = baseDotRadius * classScaleMultipliers[className];

      dots.push({
        id: `${className}-${i}`,
        class: className,
        x: cx,
        y: cy,
        radius: dotRadius
      });
    }
  });

  return { centers, dots, radii: { "Top Class (LMP1/Hypercar)": rTop, LMP2: rLmp2, "GT (GTE Pro/Am)": rGt, Experimental: expR }, c, baseDotRadius };
}

function generateSvg(width, height) {
  const { centers, dots, radii } = computeClustersAndLayout(width, height);
  const colors = {
    "Top Class (LMP1/Hypercar)": "#e8e7e3",
    "LMP2": "#92918d",
    "GT (GTE Pro/Am)": "#c2a366", // distinct golden for GT
    "Experimental": "#a855f7"
  };

  let dotElements = '';
  dots.forEach(d => {
    dotElements += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${d.radius.toFixed(1)}" fill="${colors[d.class]}" opacity="0.8" />\n`;
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#0e0f11;">
    ${dotElements}
  </svg>`;

  return { svg, centers, dots, radii };
}

// Generate for Desktop
const { svg: desktopSvg } = generateSvg(864, 780);
fs.writeFileSync(path.join(__dirname, 'test_desktop.svg'), desktopSvg);
console.log('Saved scratch/test_desktop.svg');

// Check dot collisions across classes
function checkDotCollisions(width, height) {
  const { dots } = computeClustersAndLayout(width, height);
  let minCrossDist = Infinity;
  let minPair = null;

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      if (dots[i].class === dots[j].class) continue;
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.hypot(dx, dy);
      const clearDist = dist - (dots[i].radius + dots[j].radius);
      if (clearDist < minCrossDist) {
        minCrossDist = clearDist;
        minPair = [dots[i], dots[j]];
      }
    }
  }
  console.log(`[${width}x${height}] Minimum distance between dots of different classes: ${minCrossDist.toFixed(2)}px between ${minPair[0].class} and ${minPair[1].class}`);
}

checkDotCollisions(864, 780);
checkDotCollisions(614, 648);
checkDotCollisions(390, 724);
