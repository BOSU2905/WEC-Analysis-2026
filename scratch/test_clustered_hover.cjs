const path = require('path');
const puppeteer = require(path.join(__dirname, '../web/node_modules/puppeteer'));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/WEC-Analysis-2026/', { waitUntil: 'networkidle0' });

  // Scroll to Chapter 01 where it is fully clustered (approx scroll 2200px)
  await page.evaluate(() => {
    const ch1 = document.getElementById('chapter-01');
    if (ch1) {
      const rect = ch1.getBoundingClientRect();
      window.scrollTo(0, window.pageYOffset + rect.top + ch1.offsetHeight * 0.5);
    }
  });

  await new Promise(r => setTimeout(r, 600));

  const canvasBounds = await page.evaluate(() => {
    const canvas = document.querySelector('#chapter-01 canvas');
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
  });

  console.log("Canvas bounds at 50% scroll:", canvasBounds);

  // Take screenshot of fully clustered state
  await page.screenshot({ path: path.join(__dirname, 'verified_ch1_clustered_state.png') });

  // Test hover Top Class
  const topClassX = canvasBounds.left + canvasBounds.width * 0.35;
  const topClassY = canvasBounds.top + canvasBounds.height * 0.38;
  await page.mouse.move(topClassX, topClassY);
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: path.join(__dirname, 'verified_ch1_clustered_hover_topclass.png') });

  let labels = await page.evaluate(() => {
    const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
    return groups.map(g => ({
      class: g.getAttribute('data-class'),
      opacity: parseFloat(g.style.opacity || '0')
    }));
  });
  console.log("Top class hovered at 50% scroll:", labels);

  // Test hover GT
  const gtX = canvasBounds.left + canvasBounds.width * 0.50;
  const gtY = canvasBounds.top + canvasBounds.height * 0.62;
  await page.mouse.move(gtX, gtY, { steps: 5 });
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: path.join(__dirname, 'verified_ch1_clustered_hover_gt.png') });

  labels = await page.evaluate(() => {
    const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
    return groups.map(g => ({
      class: g.getAttribute('data-class'),
      opacity: parseFloat(g.style.opacity || '0')
    }));
  });
  console.log("GT hovered at 50% scroll:", labels);

  // Test hover outside (e.g. empty space between ears: x: 50%, y: 15%)
  const emptySpaceX = canvasBounds.left + canvasBounds.width * 0.50;
  const emptySpaceY = canvasBounds.top + canvasBounds.height * 0.15;
  await page.mouse.move(emptySpaceX, emptySpaceY);
  await new Promise(r => setTimeout(r, 200));

  labels = await page.evaluate(() => {
    const groups = Array.from(document.querySelectorAll('#chapter-01 svg g.label-group'));
    return groups.map(g => ({
      class: g.getAttribute('data-class'),
      opacity: parseFloat(g.style.opacity || '0')
    }));
  });
  console.log("Empty space (between ears) at 50% scroll (should be 0):", labels);

  await browser.close();
})();
