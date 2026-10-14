const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Archives (Machines)...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#archive', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Find Aston Martin tab
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Aston Martin')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scratch/machines_aston.png' });
  console.log('Captured scratch/machines_aston.png');

  // Now click on "Porsche 911 RSR" and measure time
  const startTime = Date.now();
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text && text.includes('Porsche 911 RSR')) {
      await b.click();
      break;
    }
  }

  // Poll for Porsche 911 text in active machine
  await page.waitForFunction(() => {
    return document.body.innerText.includes('Porsche 911 RSR');
  }, { timeout: 3000 });
  const elapsed = Date.now() - startTime;
  console.log(`Switch completed in ${elapsed}ms`);

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/machines_porsche911.png' });
  console.log('Captured scratch/machines_porsche911.png');

  await browser.close();
  console.log('Done.');
})();
