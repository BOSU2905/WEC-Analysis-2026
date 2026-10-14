
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
  