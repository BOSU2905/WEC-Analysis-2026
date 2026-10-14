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

  // Find buttons in the first visible slide (2011)
  const buttons = await page.$$('button[class*="expandButton"]');
  console.log(`Found ${buttons.length} expand buttons.`);

  // Click Roster expand button (first button in 2011 slide)
  if (buttons[0]) {
    console.log('Expanding roster for 2011...');
    await buttons[0].click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/teams_expanded_roster.png' });
    console.log('Saved scratch/teams_expanded_roster.png');
  }

  // Click Race Winners expand button (second button in 2011 slide)
  if (buttons[1]) {
    console.log('Expanding race winners for 2011...');
    await buttons[1].click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/teams_expanded_winners.png' });
    console.log('Saved scratch/teams_expanded_winners.png');
  }

  await browser.close();
})();
