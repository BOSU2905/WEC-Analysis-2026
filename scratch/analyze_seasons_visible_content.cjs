const fs = require('fs');
const tsContent = fs.readFileSync('web/src/data/teams_history.ts', 'utf-8');

// Extract the TEAMS_HISTORY array
const match = tsContent.match(/export const TEAMS_HISTORY: SeasonHistory\[\] = (\[[\s\S]*?\]);\s*$/);
if (!match) {
  console.error("Could not match TEAMS_HISTORY");
  process.exit(1);
}

const teams = JSON.parse(match[1]);

console.log("Season analysis of VISIBLE content (collapsed state):");
teams.forEach((s, idx) => {
  const pTeam = s.featuredTeams[0] || {};
  const visibleChars = 
    (s.label || '').length +
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

  const numChamps = s.champions.length;
  console.log(`${idx}: ${s.label} (${s.era}): ${visibleChars} chars, ${numChamps} champions, summary len: ${s.summary.length}`);
});
