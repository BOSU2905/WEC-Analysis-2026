import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => console.log(msg.text()));

  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Starting scroll and screenshotting...");
  
  fs.mkdirSync('screenshots', { recursive: true });
  
  // Scroll so the first photo is just entering the viewport
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });
  
  let frame = 0;
  const interval = setInterval(async () => {
    frame++;
    await page.screenshot({ path: `screenshots/frame-${frame}.jpg`, type: 'jpeg', quality: 50 });
  }, 100);
  
  // Wait 4 seconds while screenshotting
  await new Promise(r => setTimeout(r, 4000));
  
  clearInterval(interval);
  
  console.log("Done.");
  await browser.close();
})();
