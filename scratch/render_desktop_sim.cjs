const puppeteer = require('../web/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

execSync('node scratch/test_desktop_sim.mjs', { stdio: 'inherit' });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 863, height: 780 });
  await page.goto('file:///' + path.resolve(__dirname, 'test_desktop_sim.svg').replace(/\\/g, '/'));
  await page.screenshot({ path: path.resolve(__dirname, 'test_desktop_sim.png') });
  await browser.close();
  console.log('Saved scratch/test_desktop_sim.png');

  const py = `
from PIL import Image
im1 = Image.open('web/references/scatter-scaled-approved.png')
im2 = Image.open('scratch/test_desktop_sim.png')
h = im1.height
w2 = int(im2.width * (h / im2.height))
im2_res = im2.resize((w2, h), Image.Resampling.LANCZOS)
comp = Image.new('RGB', (im1.width + w2, h))
comp.paste(im1, (0, 0))
comp.paste(im2_res, (im1.width, 0))
comp.save('scratch/compare_approved_vs_desktop_sim.png')
print('Saved scratch/compare_approved_vs_desktop_sim.png')
  `;
  fs.writeFileSync(path.resolve(__dirname, 'comp_sim.py'), py);
  execSync('python scratch/comp_sim.py', { stdio: 'inherit' });
})();
