const puppeteer = require('../web/node_modules/puppeteer');
const path = require('path');
const { execSync } = require('child_process');

execSync('node scratch/test_exact_ref_sim.mjs', { stdio: 'inherit' });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1143, height: 839 });
  await page.goto('file:///' + path.resolve(__dirname, 'test_exact_ref_sim.svg').replace(/\\/g, '/'));
  await page.screenshot({ path: path.resolve(__dirname, 'test_exact_ref_sim.png') });
  await browser.close();
  console.log('Saved scratch/test_exact_ref_sim.png');

  // Side-by-side comparison script
  const pyCode = `
from PIL import Image
im1 = Image.open('web/references/scatter-scaled-approved.png')
im2 = Image.open('scratch/test_exact_ref_sim.png')
comp = Image.new('RGB', (im1.width * 2, im1.height))
comp.paste(im1, (0, 0))
comp.paste(im2, (im1.width, 0))
comp.save('scratch/compare_approved_vs_exact_sim.png')
print('Comparison saved to scratch/compare_approved_vs_exact_sim.png')
  `;
  fs.writeFileSync(path.resolve(__dirname, 'compare_sim.py'), pyCode);
  execSync('python scratch/compare_sim.py', { stdio: 'inherit' });
})();
