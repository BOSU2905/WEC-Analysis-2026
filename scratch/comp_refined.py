
from PIL import Image
im1 = Image.open('web/references/scatter-scaled-approved.png')
im2 = Image.open('scratch/test_refined_sim.png')
comp = Image.new('RGB', (im1.width * 2, im1.height))
comp.paste(im1, (0, 0))
comp.paste(im2, (im1.width, 0))
comp.save('scratch/compare_refined_vs_approved.png')
print('Comparison saved to scratch/compare_refined_vs_approved.png')
  