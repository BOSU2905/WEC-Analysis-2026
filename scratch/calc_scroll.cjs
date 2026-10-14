const fs = require('fs');
const tsContent = fs.readFileSync('web/src/data/teams_history.ts', 'utf-8');
const match = tsContent.match(/export const TEAMS_HISTORY: SeasonHistory\[\] = (\[[\s\S]*?\]);\s*$/);
const teams = JSON.parse(match[1]);

const visibleLens = teams.map(s => {
  const pTeam = s.featuredTeams[0] || {};
  return (s.label || '').length +
    (s.seriesContext || '').length +
    (s.era || '').length +
    (s.dominantManufacturer || '').length +
    (s.summary || '').length +
    (pTeam.name || '').length +
    (pTeam.carModel || '').length +
    (pTeam.carNumber || '').length +
    (pTeam.drivers || []).join(' ').length +
    (pTeam.keyStat || '').length +
    (pTeam.historicalSignificance || '').length +
    s.champions.reduce((acc, c) => acc + (c.category || '').length + (c.team || '').length + (c.car || '').length + (c.drivers || []).join(' ').length, 0);
});

const avg = visibleLens.reduce((a, b) => a + b, 0) / visibleLens.length;
console.log('Avg visible len:', avg);

const weights = visibleLens.map(len => {
  const raw = len / avg;
  return Math.max(0.80, Math.min(1.30, raw));
});

console.log('Weights:', weights.map((w, i) => `${teams[i].label}: ${w.toFixed(2)}`));

const N = teams.length;
const T_BASE = 0.032; // transition duration (~3.2% of scroll)
const sumW = weights.reduce((a, b) => a + b, 0);
const remainingForPlateaus = 1.0 - (N - 1) * T_BASE;
const plateaus = weights.map(w => (w / sumW) * remainingForPlateaus);

let current = 0;
const intervals = [];
for (let i = 0; i < N; i++) {
  const pStart = current;
  const pEnd = i === N - 1 ? 1.0 : pStart + plateaus[i];
  intervals.push({ 
    season: teams[i].label, 
    pStart: Number(pStart.toFixed(4)), 
    pEnd: Number(pEnd.toFixed(4)), 
    duration: Number((pEnd - pStart).toFixed(4)), 
    mid: Number(((pStart + pEnd) / 2).toFixed(4)) 
  });
  current = pEnd + T_BASE;
}

console.table(intervals);
