const puppeteer = require('../web/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

execSync('node scratch/test_refined_sim.mjs', { stdio: 'inherit' });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1143, height: 839 });
  await page.goto('file:///' + path.resolve(__dirname, 'test_refined_sim.svg').replace(/\\/g, '/'));
  await page.screenshot({ path: path.resolve(__dirname, 'test_refined_sim.png') });
  await browser.close();
  console.log('Saved scratch/test_refined_sim.png');

  // Side-by-side comparison script
  const pyCode = `
from PIL import Image
im1 = Image.open('web/references/scatter-scaled-approved.png')
im2 = Image.open('scratch/test_refined_sim.png')
comp = Image.new('RGB', (im1.width * 2, im1.height))
comp.paste(im1, (0, 0))
comp.paste(im2, (im1.width, 0))
comp.save('scratch/compare_refined_vs_approved.png')
print('Comparison saved to scratch/compare_refined_vs_approved.png')
  `;
  fs.writeFileSync(path.resolve(__dirname, 'comp_refined.py'), pyCode);
  execSync('python scratch/comp_refined.py', { stdio: 'inherit' });
})();
