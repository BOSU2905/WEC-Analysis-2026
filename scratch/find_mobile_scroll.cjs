const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const bounds = await page.evaluate(() => {
    const scrolly = document.querySelector('#chapter-01 [class*="scrollyContainer"]');
    const r = scrolly.getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    return { top: r.top + st, height: scrolly.offsetHeight };
  });

  // start start is when scrollTop = bounds.top = 4440.5
  // end end is when scrollTop = bounds.top + bounds.height - 844 = 4440.5 + 3176 - 844 = 6772.5
  // To get progress = 0.60:
  // scrollTop = 4440.5 + (6772.5 - 4440.5) * 0.60 = 4440.5 + 2332 * 0.60 = 5840
  console.log('Mobile scroll bounds:', bounds);

  // Let's test scroll positions from 4500 to 6500 in steps of 250
  for (let y = 4600; y <= 6600; y += 300) {
    await page.evaluate(targetY => window.scrollTo({ top: targetY, behavior: 'instant' }), y);
    await new Promise(r => setTimeout(r, 200));

    const progressInfo = await page.evaluate(() => {
      const scrolly = document.querySelector('#chapter-01 [class*="scrollyContainer"]');
      const r = scrolly.getBoundingClientRect();
      const progress = (0 - r.top) / (r.height - window.innerHeight);
      return { top: r.top, progress: progress.toFixed(3) };
    });

    console.log(`y=${y}:`, progressInfo);
    if (parseFloat(progressInfo.progress) >= 0.50 && parseFloat(progressInfo.progress) <= 0.65) {
      await page.screenshot({ path: path.join(__dirname, `mobile_exact_p${Math.round(parseFloat(progressInfo.progress)*100)}.png`) });
      console.log(`Saved screenshot at progress ${progressInfo.progress}`);
    }
  }

  await browser.close();
})();
