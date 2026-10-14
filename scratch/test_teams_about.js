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
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scratch/teams_desktop_initial.png' });
  console.log('Captured scratch/teams_desktop_initial.png');

  // Click expand winners button on first season (2011)
  const expandBtn = await page.$('button[class*="expandWinnersButton"]');
  if (expandBtn) {
    console.log('Clicking Expand Race Winners button...');
    await expandBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/teams_desktop_expanded.png' });
    console.log('Captured scratch/teams_desktop_expanded.png');
  }

  // Click on "2015" in the segmented navigator
  const segButtons = await page.$$('button[class*="segmentButton"]');
  console.log(`Found ${segButtons.length} segmented year buttons.`);
  for (const b of segButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('2015')) {
      console.log('Jumping to season 2015...');
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/teams_2015.png' });
  console.log('Captured scratch/teams_2015.png');

  // Click on "2023" in the segmented navigator
  for (const b of segButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('2023')) {
      console.log('Jumping to season 2023...');
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/teams_2023.png' });
  console.log('Captured scratch/teams_2023.png');

  // Navigating to About page
  console.log('Navigating to About (#about)...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/about_desktop.png' });
  console.log('Captured scratch/about_desktop.png');

  // Test Mobile Viewport
  console.log('Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/teams_mobile.png' });
  console.log('Captured scratch/teams_mobile.png');

  await page.goto('http://localhost:5173/WEC-Analysis-2026/#about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/about_mobile.png' });
  console.log('Captured scratch/about_mobile.png');

  await browser.close();
  console.log('Teams & About tests completed successfully!');
})();
