const path = require('path');
const puppeteer = require(path.join(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#teams', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav[aria-label="Season Timeline Navigator"] button'));
    const btn2023 = buttons.find(b => b.textContent.includes('2023'));
    if (btn2023) btn2023.click();
  });

  for (let t of [500, 1000, 1500, 2000]) {
    await new Promise(r => setTimeout(r, 500));
    const info = await page.evaluate(() => {
      const active = document.querySelector('nav[aria-label="Season Timeline Navigator"] button[class*="activeSegment"]');
      const container = document.querySelector('[class*="teamsExperience"]');
      return {
        scrollY: window.scrollY,
        containerScrollHeight: container ? container.scrollHeight : null,
        active: active ? active.textContent.trim() : null
      };
    });
    console.log(`After ${t}ms:`, info);
  }

  await browser.close();
})();
