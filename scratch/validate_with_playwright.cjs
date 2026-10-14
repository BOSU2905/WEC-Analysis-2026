const { chromium } = require('playwright');
const path = require('path');

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('1. Navigating to Teams page...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#/teams', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: path.join(__dirname, 'teams_2011_rested.png') });
  console.log('Saved teams_2011_rested.png');

  // Check that no img is in .editorialSeasonCard
  const imgCount = await page.locator('.editorialSeasonCard img').count();
  console.log('Images inside .editorialSeasonCard:', imgCount);

  // Check header, badges, and champions
  const yearText = await page.locator('h2[class*="seasonYear"]').first().textContent();
  console.log('Active season year:', yearText);

  // Jump to 2018–2019
  console.log('2. Clicking 2018–2019 button...');
  await page.locator('button:has-text("2018–2019")').click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(__dirname, 'teams_2018_jump.png') });
  console.log('Saved teams_2018_jump.png');

  // Jump to 2023
  console.log('3. Clicking 2023 button...');
  await page.locator('button').filter({ hasText: /^2023$/ }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(__dirname, 'teams_2023_jump.png') });
  console.log('Saved teams_2023_jump.png');

  // Navigate to Story (Chapter 1)
  console.log('4. Navigating to Story...');
  await page.goto('http://localhost:5173/WEC-Analysis-2026/#/story', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const ch1 = page.locator('#chapter-01');
  await ch1.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'chapter01_scatter_mickey.png') });
  console.log('Saved chapter01_scatter_mickey.png');

  // Hit test in empty space vs on cluster
  const container = page.locator('[class*="ScaleScatter_container"]');
  const box = await container.boundingBox();
  if (box) {
    console.log('Testing empty space hover at top-left corner (x: 25, y: 25)...');
    await page.mouse.move(box.x + 25, box.y + 25);
    await page.waitForTimeout(600);
    const emptyOpacities = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('g.label-group'));
      return groups.map(g => parseFloat(g.style.opacity || '0'));
    });
    console.log('Label opacities in empty space:', emptyOpacities);

    console.log('Testing GT cluster hover at center (x: 50%, y: 62%)...');
    await page.mouse.move(box.x + box.width * 0.50, box.y + box.height * 0.62);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(__dirname, 'chapter01_gt_hover.png') });
    console.log('Saved chapter01_gt_hover.png');

    const gtHoverOpacities = await page.evaluate(() => {
      const groups = Array.from(document.querySelectorAll('g.label-group'));
      return groups.map(g => ({
        cls: g.getAttribute('data-class'),
        op: parseFloat(g.style.opacity || '0')
      }));
    });
    console.log('Label opacities on GT hover:', gtHoverOpacities);
  }

  // Chapter 3 opening
  console.log('5. Scrolling to Chapter 3...');
  const ch3 = page.locator('#chapter-03');
  await ch3.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(__dirname, 'chapter03_opening.png') });
  console.log('Saved chapter03_opening.png');

  await browser.close();
  console.log('All tests completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
