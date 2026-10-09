import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => {
    console.log(msg.text());
  });

  console.log("Loading page...");
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  console.log("Simulating slow human scroll...");
  await page.evaluate(async () => {
    return new Promise((resolve) => {
      let scrollY = 0;
      const targetScroll = 1500;
      const scrollStep = 10;
      const scrollInterval = setInterval(() => {
        scrollY += scrollStep;
        window.scrollTo(0, scrollY);
        if (scrollY >= targetScroll) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 16); // 60fps smooth scroll
    });
  });

  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Scrolling to second photo...");
  await page.evaluate(async () => {
    return new Promise((resolve) => {
      let scrollY = 1500;
      const targetScroll = 3000;
      const scrollStep = 10;
      const scrollInterval = setInterval(() => {
        scrollY += scrollStep;
        window.scrollTo(0, scrollY);
        if (scrollY >= targetScroll) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 16);
    });
  });

  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
