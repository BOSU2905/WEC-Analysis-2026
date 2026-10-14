const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const segButtons = await page.$$('button[class*="segmentButton"]');
  for (const b of segButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('2015')) {
      await b.click();
      break;
    }
  }
  // Wait for spring to settle
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: 'scratch/teams_2015_settled.png' });
  console.log('Saved scratch/teams_2015_settled.png');

  // Also test clicking expand roster
  const expandButtons = await page.$$('button[class*="expandButton"]');
  // First button in active view is roster
  for (const eb of expandButtons) {
    const text = await page.evaluate(el => el.textContent, eb);
    if (text && text.includes('Explore Full Season Roster')) {
      await eb.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/teams_2015_expanded_roster.png' });
  console.log('Saved scratch/teams_2015_expanded_roster.png');

  await browser.close();
})();
