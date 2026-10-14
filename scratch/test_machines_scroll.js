const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

  await page.goto('http://localhost:5173/WEC-Analysis-2026/#archive', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to Machines section
  await page.evaluate(() => {
    window.scrollTo({ top: 450 });
  });
  await new Promise(r => setTimeout(r, 500));

  // Click on "Porsche 911 RSR"
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Porsche 911 RSR')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scratch/machines_stage_porsche.png' });
  console.log('Captured scratch/machines_stage_porsche.png');

  await browser.close();
})();
