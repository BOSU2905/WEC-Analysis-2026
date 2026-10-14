const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const ch3Info = await page.evaluate(() => {
    const el = document.getElementById('chapter-03');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: el.offsetHeight
    };
  });

  console.log('Chapter 3 scroll info:', ch3Info);
  if (ch3Info) {
    // 1. At 25% scroll progress of Chapter 3
    const y25 = ch3Info.top + ch3Info.height * 0.25;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y25);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'chapter03_prog_25.png') });
    console.log('Saved scratch/chapter03_prog_25.png');

    // 2. At 55% scroll progress of Chapter 3
    const y55 = ch3Info.top + ch3Info.height * 0.55;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y55);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'chapter03_prog_55.png') });
    console.log('Saved scratch/chapter03_prog_55.png');

    // 3. At 85% scroll progress of Chapter 3
    const y85 = ch3Info.top + ch3Info.height * 0.85;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y85);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'chapter03_prog_85.png') });
    console.log('Saved scratch/chapter03_prog_85.png');
  }

  await browser.close();
})();
