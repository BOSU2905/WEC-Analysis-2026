const path = require('path');
const puppeteer = require(path.resolve(__dirname, '../web/node_modules/puppeteer'));
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Teams page...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#/teams', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Capture Teams desktop 2011 season (rested plateau)
  await page.screenshot({ path: path.join(__dirname, 'teams_2011_rested.png') });
  console.log('Captured teams_2011_rested.png');

  // Verify no large vehicle photo exists in the main card
  const imgCount = await page.evaluate(() => {
    return document.querySelectorAll('.editorialSeasonCard img').length;
  });
  console.log('Image count inside editorialSeasonCard:', imgCount);

  // 2. Test horizontal scrolling: scroll down a moderate amount to test plateau stability
  await page.evaluate(() => {
    window.scrollBy({ top: 350, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'teams_plateau_scroll.png') });
  console.log('Captured teams_plateau_scroll.png');

  // 3. Test jumping to 2018-2019 season
  console.log('Clicking 2018–2019 segment button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.includes('2018–2019'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(__dirname, 'teams_2018_jump.png') });
  console.log('Captured teams_2018_jump.png');

  // 4. Test jumping to final season 2023
  console.log('Clicking 2023 segment button...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.trim() === '2023');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(__dirname, 'teams_2023_jump.png') });
  console.log('Captured teams_2023_jump.png');

  // 5. Navigate to Chapter 1 & test Mickey Mouse scatter and hit testing
  console.log('Navigating to Chapter 1...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#/story', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to Chapter 1
  await page.evaluate(() => {
    const ch1 = document.getElementById('chapter-01');
    if (ch1) ch1.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'chapter01_scatter_mickey.png') });
  console.log('Captured chapter01_scatter_mickey.png');

  // Test pointer hit testing in empty space: move mouse to (100, 100) inside container
  const scatterBox = await page.evaluate(() => {
    const el = document.querySelector('[class*="ScaleScatter_container"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  if (scatterBox) {
    console.log('Moving mouse to empty corner of scatter container (top: 30, left: 30)...');
    await page.mouse.move(scatterBox.left + 30, scatterBox.top + 30);
    await new Promise(r => setTimeout(r, 600));

    const emptySpaceOpacity = await page.evaluate(() => {
      const labelGroups = Array.from(document.querySelectorAll('g.label-group'));
      return labelGroups.map(g => parseFloat(g.style.opacity || '0'));
    });
    console.log('Label opacities in empty space:', emptySpaceOpacity);

    // Now move mouse directly to the center of GT cluster (at 50% width, 62% height)
    console.log('Moving mouse into GT cluster center...');
    await page.mouse.move(scatterBox.left + scatterBox.width * 0.50, scatterBox.top + scatterBox.height * 0.62);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(__dirname, 'chapter01_gt_hover.png') });
    console.log('Captured chapter01_gt_hover.png');

    const gtHoverOpacity = await page.evaluate(() => {
      const labelGroups = Array.from(document.querySelectorAll('g.label-group'));
      return labelGroups.map(g => ({
        cls: g.getAttribute('data-class'),
        op: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log('Label opacities on GT hover:', gtHoverOpacity);

    // Move mouse out of the scatter container completely
    console.log('Moving mouse completely out of scatter container...');
    await page.mouse.move(10, 10);
    await new Promise(r => setTimeout(r, 800));
    const outOpacity = await page.evaluate(() => {
      const labelGroups = Array.from(document.querySelectorAll('g.label-group'));
      return labelGroups.map(g => parseFloat(g.style.opacity || '0'));
    });
    console.log('Label opacities when mouse leaves:', outOpacity);
  }

  // 6. Test Chapter 3 opening animation
  console.log('Scrolling to Chapter 3...');
  await page.evaluate(() => {
    const ch3 = document.getElementById('chapter-03');
    if (ch3) ch3.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'chapter03_opening.png') });
  console.log('Captured chapter03_opening.png');

  await browser.close();
  console.log('Validation finished successfully!');
}

run().catch(err => {
  console.error('Validation error:', err);
  process.exit(1);
});
