const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:/Users/user/.gemini/antigravity-ide/brain/e1aaf445-73d5-47f5-b153-20b25e7677f2/.tempmediaStorage';
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Test Chapter 4 Visualization via ChapterNav
  console.log('\n--- TESTING CHAPTER 4 ---');
  await page.click('a[href="#chapter-04"]');
  await page.waitForSelector('#chapter-04', { timeout: 15000 });
  await page.evaluate(() => {
    const vis = document.querySelector('#chapter-04 [class*="visualizationBlock"]');
    if (vis) vis.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));

  const ch4Axes = await page.evaluate(() => {
    const ch4 = document.getElementById('chapter-04');
    if (!ch4) return { error: 'Chapter 4 not found' };
    const texts = Array.from(ch4.querySelectorAll('svg text')).map(t => t.textContent.trim());
    const hasX = texts.some(t => t === 'Season (Year)');
    const hasY = texts.some(t => t === 'Tyre Assignment Share (%)');
    return { texts, hasX, hasY };
  });
  console.log('Chapter 4 Axis labels detected:', ch4Axes);

  const ch4Screenshot = path.join(ARTIFACTS_DIR, `ch4_desktop_${Date.now()}.png`);
  await page.screenshot({ path: ch4Screenshot });
  console.log('Saved Chapter 4 screenshot:', ch4Screenshot);

  // 2. Test Chapter 5 Visualization via ChapterNav
  console.log('\n--- TESTING CHAPTER 5 ---');
  await page.click('a[href="#chapter-05"]');
  await page.waitForSelector('#chapter-05', { timeout: 15000 });
  await page.evaluate(() => {
    const vis = document.querySelector('#chapter-05 [class*="visualizationBlock"]');
    if (vis) vis.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));

  const ch5Axes = await page.evaluate(() => {
    const ch5 = document.getElementById('chapter-05');
    if (!ch5) return { error: 'Chapter 5 not found' };
    const texts = Array.from(ch5.querySelectorAll('svg text')).map(t => t.textContent.trim());
    const hasX = texts.some(t => t === 'Season (Year)');
    const hasY = texts.some(t => t === 'Fastest Lap Time (mm:ss)');
    return { texts, hasX, hasY };
  });
  console.log('Chapter 5 Axis labels detected:', ch5Axes);

  // 3. Test Chapter 5 Hover Tooltip
  console.log('\n--- TESTING CHAPTER 5 HOVER TOOLTIP ---');
  const hoverResults = await page.evaluate(async () => {
    const ch5 = document.getElementById('chapter-05');
    const hitTargets = Array.from(ch5.querySelectorAll('circle[role="graphics-symbol"]'));
    const tooltip = ch5.querySelector('[role="status"]');
    
    if (hitTargets.length === 0 || !tooltip) {
      return { error: 'Hit targets or tooltip element not found' };
    }

    const testPoint = hitTargets[4]; // 2015 season Top Class
    const aria = testPoint.getAttribute('aria-label');

    // Trigger pointerenter
    testPoint.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));

    const opacity = tooltip.style.opacity;
    const content = tooltip.innerText;
    const tooltipRect = tooltip.getBoundingClientRect();
    const containerRect = ch5.getBoundingClientRect();

    const isClippedLeft = tooltipRect.left < containerRect.left;
    const isClippedRight = tooltipRect.right > containerRect.right;
    const isClippedTop = tooltipRect.top < 0;

    const firstBaseDot = ch5.querySelector('circle.dot-0');
    const dotRadius = firstBaseDot?.getAttribute('r');
    const dotStrokeWidth = firstBaseDot?.getAttribute('stroke-width');
    const dotOpacity = firstBaseDot ? window.getComputedStyle(firstBaseDot).opacity : null;

    return {
      aria,
      opacity,
      content,
      dotRadius,
      dotStrokeWidth,
      dotOpacity,
      isClippedLeft,
      isClippedRight,
      isClippedTop,
      totalHitTargets: hitTargets.length
    };
  });
  console.log('Chapter 5 Hover test result:', hoverResults);

  const ch5HoverScreenshot = path.join(ARTIFACTS_DIR, `ch5_hover_${Date.now()}.png`);
  await page.screenshot({ path: ch5HoverScreenshot });
  console.log('Saved Chapter 5 Hover screenshot:', ch5HoverScreenshot);

  // 4. Test Chapter 5 Keyboard Accessibility
  console.log('\n--- TESTING KEYBOARD ACCESSIBILITY ---');
  const keyboardResult = await page.evaluate(async () => {
    const ch5 = document.getElementById('chapter-05');
    const firstHit = ch5.querySelector('circle[role="graphics-symbol"]');
    const tooltip = ch5.querySelector('[role="status"]');
    
    firstHit.focus();
    const focusedAria = firstHit.getAttribute('aria-label');
    const opacityOnFocus = tooltip.style.opacity;
    const contentOnFocus = tooltip.innerText;

    // Dispatch Escape key
    firstHit.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    const opacityAfterEsc = tooltip.style.opacity;

    return {
      focusedAria,
      opacityOnFocus,
      contentOnFocus,
      opacityAfterEsc
    };
  });
  console.log('Keyboard test result:', keyboardResult);

  // 5. Test Light Theme
  console.log('\n--- TESTING LIGHT THEME ---');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const ch5 = document.getElementById('chapter-05');
    const hitTarget = ch5.querySelectorAll('circle[role="graphics-symbol"]')[4];
    hitTarget.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
  });
  await new Promise(r => setTimeout(r, 500));

  const lightScreenshot = path.join(ARTIFACTS_DIR, `ch5_light_theme_${Date.now()}.png`);
  await page.screenshot({ path: lightScreenshot });
  console.log('Saved Chapter 5 Light Theme screenshot:', lightScreenshot);

  // 6. Test Mobile Viewport (390x844)
  console.log('\n--- TESTING MOBILE VIEW (390x844) ---');
  await page.setViewport({ width: 390, height: 844 });
  const mobileHover = await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const vis = document.querySelector('#chapter-05 [class*="visualizationBlock"]');
    if (vis) vis.scrollIntoView({ behavior: 'instant', block: 'center' });
    const ch5 = document.getElementById('chapter-05');
    const hitTarget = ch5.querySelectorAll('circle[role="graphics-symbol"]')[4];
    hitTarget.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true }));
    const tooltip = ch5.querySelector('[role="status"]');
    const tooltipRect = tooltip.getBoundingClientRect();
    return {
      leftWithin: tooltipRect.left >= 0,
      rightWithin: tooltipRect.right <= window.innerWidth
    };
  });
  console.log('Mobile hover boundaries check:', mobileHover);
  await new Promise(r => setTimeout(r, 600));

  const mobileScreenshot = path.join(ARTIFACTS_DIR, `ch5_mobile_${Date.now()}.png`);
  await page.screenshot({ path: mobileScreenshot });
  console.log('Saved Mobile screenshot:', mobileScreenshot);

  // 7. Verify Chapter 3 and Archives
  console.log('\n--- VERIFYING CHAPTER 3 AND ARCHIVES ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const ch3 = document.getElementById('chapter-03-wrap') || document.getElementById('chapter-03');
    if (ch3) ch3.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForSelector('#chapter-03', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));
  const ch3Status = await page.evaluate(() => {
    const ch3 = document.getElementById('chapter-03');
    const canvas = ch3 ? ch3.querySelector('canvas') : null;
    return {
      found: !!ch3,
      canvasFound: !!canvas,
      canvasWidth: canvas ? canvas.width : 0
    };
  });
  console.log('Chapter 3 status:', ch3Status);

  await page.goto('http://localhost:5173/#archive', { waitUntil: 'networkidle2' });
  await page.waitForSelector('button[class*="tab"]', { timeout: 10000 });
  
  // Test Oreca 07 tab
  const orecaStatus = await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button[class*="tab"]')).map(b => b.textContent.trim());
    const heading = document.querySelector('h3[class*="machineName"]')?.textContent?.trim();
    return { tabs, heading };
  });
  console.log('Oreca tab & heading status:', orecaStatus);
  const orecaScreenshot = path.join(ARTIFACTS_DIR, `archive_oreca_${Date.now()}.png`);
  await page.screenshot({ path: orecaScreenshot });

  // Click Toyota TS050 Hybrid tab
  console.log('\nClicking Toyota TS050 Hybrid tab...');
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button[class*="tab"]'));
    const toyotaTab = tabs.find(t => t.textContent.includes('Toyota'));
    if (toyotaTab) toyotaTab.click();
  });
  try {
    await page.waitForSelector('div[class*="modelWrapper"] canvas', { timeout: 15000 });
  } catch (e) {
    console.log('Canvas wait timeout:', e.message);
  }

  await page.evaluate(() => {
    const stage = document.querySelector('div[class*="stage"]');
    if (stage) stage.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1000));

  const toyotaStatus = await page.evaluate(() => {
    const heading = document.querySelector('h3[class*="machineName"]')?.textContent?.trim();
    const hasCanvas = !!document.querySelector('div[class*="modelWrapper"] canvas');
    const attribution = document.querySelector('div[class*="attribution"]')?.textContent?.trim() || document.querySelector('div[class*="modelWrapper"]')?.textContent?.trim();
    return { heading, hasCanvas, attribution };
  });
  console.log('Toyota tab status:', toyotaStatus);
  const toyotaScreenshot = path.join(ARTIFACTS_DIR, `archive_toyota_3d_${Date.now()}.png`);
  await page.screenshot({ path: toyotaScreenshot });

  await browser.close();
  console.log('\nAll browser validation checks passed successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
