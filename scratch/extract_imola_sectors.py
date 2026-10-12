import xml.etree.ElementTree as ET
import re

with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']

# im_d starts with m 501.6875, 603.96875
# then c with pairs of (dx1, dy1, dx2, dy2, dx3, dy3)
nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', im_d)]
cur_x = nums[0]
cur_y = nums[1]
pts = [(cur_x, cur_y)]

# Let's inspect each cubic segment
cubics = []
idx = 2
while idx + 6 <= len(nums):
    dx3, dy3 = nums[idx+4], nums[idx+5]
    cur_x += dx3
    cur_y += dy3
    cubics.append((nums[idx:idx+6], (cur_x, cur_y)))
    idx += 6

print(f"Total cubic segments in Imola: {len(cubics)}")
for i, (coords, pt) in enumerate(cubics):
    if i % 5 == 0 or i in (10, 15, 20, 25, 30, 35, 40):
        print(f"  segment[{i}] end=({pt[0]:.1f}, {pt[1]:.1f})")
