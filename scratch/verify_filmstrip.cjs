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

  // 1. Inspect Filmstrip
  console.log("Inspecting Hero Filmstrip...");
  const filmstripData = await page.$$eval('img[class*="filmstripImage"]', imgs => imgs.map((img, idx) => ({
    idx,
    src: img.src.split('/').pop(),
    alt: img.alt.substring(0, 30),
    loading: img.loading,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  })));

  console.log(`Total filmstrip elements found: ${filmstripData.length}`);
  const notLoaded = filmstripData.filter(img => !img.complete || img.naturalWidth === 0);
  console.log(`Not yet loaded count: ${notLoaded.length}`);
  if (notLoaded.length > 0) {
    console.log("Sample not loaded:", notLoaded.slice(0, 5));
  }
  const loaded = filmstripData.filter(img => img.complete && img.naturalWidth > 0);
  console.log(`Loaded count: ${loaded.length}`);
  console.log("Unique loaded src:", [...new Set(loaded.map(i => i.src))]);

  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, 'hero_filmstrip.png') });
  console.log("Captured hero_filmstrip.png screenshot.");

  // 2. Open credits modal to verify filmstrip cards
  console.log("Opening Credits Modal...");
  await page.evaluate(() => {
    window.location.hash = '#credits';
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll inside modal scrollArea to filmstrip items
  await page.evaluate(() => {
    const scrollContainer = document.querySelector('div[class*="scrollArea"]');
    if (scrollContainer) {
      scrollContainer.scrollTop = 4200;
    }
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(outDir, 'credits_filmstrip_modal.png') });
  console.log("Captured credits_filmstrip_modal.png screenshot.");

  await browser.close();
  console.log("Verification finished successfully!");
})();
