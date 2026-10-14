
from PIL import Image
ref = Image.open('web/references/scatter-scaled-approved.png')
cur = Image.open('scratch/live_desktop_settled.png')

# Crop canvas region from cur
# Canvas is on the left
w_crop = int(cur.width * 0.60)
h_crop = cur.height
cur_cropped = cur.crop((0, 0, w_crop, h_crop))

# Resize cur_cropped to match ref height
scale_h = ref.height / cur_cropped.height
w_scaled = int(cur_cropped.width * scale_h)
cur_scaled = cur_cropped.resize((w_scaled, ref.height), Image.Resampling.LANCZOS)

comp = Image.new('RGB', (ref.width + w_scaled, ref.height))
comp.paste(ref, (0, 0))
comp.paste(cur_scaled, (ref.width, 0))
comp.save('scratch/compare_live_vs_approved.png')
print('Saved scratch/compare_live_vs_approved.png')
  