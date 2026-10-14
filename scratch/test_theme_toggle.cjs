const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Check default theme on html/root
  const defaultTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });
  console.log('Default theme attribute:', defaultTheme);

  // Click theme toggle button
  const toggleBtn = await page.$('button[aria-label*="theme" i], button[title*="theme" i], header button');
  if (toggleBtn) {
    console.log('Clicking theme toggle to switch to Light mode...');
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'teams_light_theme.png') });
    console.log('Saved scratch/teams_light_theme.png');

    const lightTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    console.log('After toggle, data-theme:', lightTheme);

    // Toggle back to Dark mode
    console.log('Clicking theme toggle to switch back to Dark mode...');
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'teams_dark_theme.png') });
    console.log('Saved scratch/teams_dark_theme.png');
  }

  await browser.close();
})();
