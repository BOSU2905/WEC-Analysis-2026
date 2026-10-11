const puppeteer = require('../web/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Check Hero Filmstrip
  console.log("Checking Hero Filmstrip...");
  const filmstripImages = await page.$$eval('img[class*="filmstripImage"]', imgs => imgs.map(img => ({
    src: img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  })));
  console.log(`Found ${filmstripImages.length} filmstrip img elements.`);
  const allLoaded = filmstripImages.every(img => img.complete && img.naturalWidth > 0);
  console.log(`All filmstrip images loaded successfully: ${allLoaded}`);

  // 2. Scroll through Chapter 00 and check images
  console.log("Scrolling through Chapter 00...");
  await page.evaluate(() => {
    const ch0 = document.getElementById('chapter-00');
    if (ch0) ch0.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to the second photo in Chapter 00
  await page.evaluate(() => {
    const imgs = document.querySelectorAll('#chapter-00 img');
    if (imgs[1]) imgs[1].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));

  const editorialImages = await page.$$eval('#chapter-00 img', imgs => imgs.map(img => ({
    alt: img.alt,
    src: img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  })));
  console.log("Chapter 00 images after scroll:", editorialImages);

  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, 'chapter00_pit.png') });
  console.log("Captured chapter00_pit.png screenshot.");

  // 3. Test opening Photo Credits Modal via hash #credits
  console.log("Testing #credits navigation...");
  await page.evaluate(() => {
    window.location.hash = '#credits';
  });
  await new Promise(r => setTimeout(r, 800));

  const modalVisible = await page.$eval('div[role="dialog"]', el => !!el).catch(() => false);
  console.log(`Credits modal visible: ${modalVisible}`);

  const modalMetrics = await page.$$eval('span[class*="metricItem"]', els => els.map(el => el.innerText));
  console.log("Modal metrics:", modalMetrics);

  const cardsCount = await page.$$eval('article[class*="card"]', els => els.length);
  console.log(`Rendered cards count: ${cardsCount}`);

  await page.screenshot({ path: path.join(outDir, 'credits_modal.png') });
  console.log("Captured credits_modal.png screenshot.");

  // 4. Test pressing Escape to close modal
  console.log("Testing Escape key...");
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));
  const modalStillVisible = await page.$eval('div[role="dialog"]', el => !!el).catch(() => false);
  console.log(`Modal visible after Escape: ${modalStillVisible}`);

  await browser.close();
  console.log("Verification finished successfully!");
})();
