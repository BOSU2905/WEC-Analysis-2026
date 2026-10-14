const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  // iPhone 12 / 14 / Pixel standard viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('Navigating to Teams on mobile...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'teams_mobile_viewport.png') });
  console.log('Saved scratch/teams_mobile_viewport.png');

  console.log('Navigating to Story on mobile...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'story_mobile_viewport.png') });
  console.log('Saved scratch/story_mobile_viewport.png');

  console.log('Navigating to About on mobile...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'about_mobile_viewport.png') });
  console.log('Saved scratch/about_mobile_viewport.png');

  await browser.close();
})();
