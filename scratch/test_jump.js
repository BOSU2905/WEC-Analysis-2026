const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  console.log('Navigating to Teams (#teams)...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Directly jump to season 2015 (index 4) by calculating scrollY and setting window.scrollTo({ top, behavior: 'instant' })
  await page.evaluate(() => {
    const totalSeasons = 12;
    const index = 4; // 2015
    const container = document.querySelector('div[class*="teamsExperience"]');
    if (container) {
      const totalScrollable = container.scrollHeight - window.innerHeight;
      const targetY = container.offsetTop + (index / (totalSeasons - 1)) * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'instant' });
    }
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/teams_2015_verified.png' });
  console.log('Captured scratch/teams_2015_verified.png');

  // Directly jump to season 2023 (index 11)
  await page.evaluate(() => {
    const totalSeasons = 12;
    const index = 11; // 2023
    const container = document.querySelector('div[class*="teamsExperience"]');
    if (container) {
      const totalScrollable = container.scrollHeight - window.innerHeight;
      const targetY = container.offsetTop + (index / (totalSeasons - 1)) * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'instant' });
    }
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/teams_2023_verified.png' });
  console.log('Captured scratch/teams_2023_verified.png');

  await browser.close();
  console.log('Done.');
})();
