import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => {
    if (msg.text().includes('[PHOTO')) {
      console.log(msg.text());
    }
  });

  console.log("Navigating to localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Scrolling down to Photo 1...");
  await page.evaluate(() => {
    const el = document.getElementById('chapter-00');
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    window.scrollBy({ top: 500, behavior: 'auto' });
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    window.scrollBy({ top: 500, behavior: 'auto' });
  });

  await new Promise(r => setTimeout(r, 4000));
  
  console.log("Scrolling down to Photo 2...");
  await page.evaluate(() => {
    window.scrollBy({ top: 800, behavior: 'auto' });
  });

  await new Promise(r => setTimeout(r, 4000));

  await browser.close();
})();
