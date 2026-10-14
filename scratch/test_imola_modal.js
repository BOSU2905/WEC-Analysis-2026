const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173/WEC-Analysis-2026/#paddock', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot archive hero
  await page.screenshot({ path: 'scratch/archive_hero.png', clip: { x: 0, y: 0, width: 1440, height: 500 } });

  // Find explore button for Imola
  const imolaBtn = await page.$('#explore-btn-imola');
  if (imolaBtn) {
    await imolaBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // Select Sector 3
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Sector 3')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/imola_sector3_modal.png' });
  } else {
    console.log('Imola button not found');
  }

  await browser.close();
  console.log('Imola inspection script done.');
})();
