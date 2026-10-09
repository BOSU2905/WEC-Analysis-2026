import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => {
    console.log(msg.text());
  });

  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    console.log(`[SCROLL START] at ${performance.now()}`);
    // Scroll directly to the photo wrapper so it intersects instantly
    const wrappers = document.querySelectorAll('[class*="imageWrapper"]');
    if (wrappers.length > 0) {
      wrappers[0].scrollIntoView({ behavior: 'auto', block: 'end' }); // Scroll so bottom is aligned to bottom (so top is well within viewport)
    }
    console.log(`[SCROLL END] at ${performance.now()}`);
  });

  await new Promise(r => setTimeout(r, 3000));
  
  await page.evaluate(() => {
    console.log(`[SCROLL START 2] at ${performance.now()}`);
    const wrappers = document.querySelectorAll('[class*="imageWrapper"]');
    if (wrappers.length > 1) {
      wrappers[1].scrollIntoView({ behavior: 'auto', block: 'end' });
    }
    console.log(`[SCROLL END 2] at ${performance.now()}`);
  });

  await new Promise(r => setTimeout(r, 3000));

  await browser.close();
})();
