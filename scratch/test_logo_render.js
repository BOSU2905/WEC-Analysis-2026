const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Desktop Dark
  await page.goto('http://localhost:5173/WEC-Analysis-2026/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'scratch/navbar_dark.png', clip: { x: 0, y: 0, width: 1440, height: 120 } });

  // Footer dark
  const footerEl = await page.$('footer');
  if (footerEl) {
    const box = await footerEl.boundingBox();
    if (box) {
      await page.screenshot({ path: 'scratch/footer_dark.png', clip: box });
    }
  }

  // 2. Desktop Light
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('wec-theme', 'light');
    window.dispatchEvent(new CustomEvent('wec-theme-change', { detail: { theme: 'light' } }));
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/navbar_light.png', clip: { x: 0, y: 0, width: 1440, height: 120 } });

  // 3. Mobile Dark & Light
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('wec-theme', 'dark');
    window.dispatchEvent(new CustomEvent('wec-theme-change', { detail: { theme: 'dark' } }));
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/navbar_mobile_dark.png', clip: { x: 0, y: 0, width: 390, height: 100 } });

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('wec-theme', 'light');
    window.dispatchEvent(new CustomEvent('wec-theme-change', { detail: { theme: 'light' } }));
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/navbar_mobile_light.png', clip: { x: 0, y: 0, width: 390, height: 100 } });

  await browser.close();
  console.log('Screenshots captured successfully.');
})();
