import xml.etree.ElementTree as ET
import re

with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']

nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', im_d)]
cur_x, cur_y = nums[0], nums[1]

# Reconstruct 3 subpaths: segments 0-11 (S1), 12-26 (S2), 27-end (S3)
def build_subpath(start_pt, segments):
    res = [f"M {start_pt[0]:.3f},{start_pt[1]:.3f} c"]
    for seg in segments:
        res.append(f" {seg[0]:.3f},{seg[1]:.3f} {seg[2]:.3f},{seg[3]:.3f} {seg[4]:.3f},{seg[5]:.3f}")
    return "".join(res)

cubics = []
idx = 2
while idx + 6 <= len(nums):
    dx3, dy3 = nums[idx+4], nums[idx+5]
    cubics.append((nums[idx:idx+6], (cur_x, cur_y)))
    cur_x += dx3
    cur_y += dy3
    idx += 6

s1_d = build_subpath((nums[0], nums[1]), [c[0] for c in cubics[0:12]])
s2_start = cubics[12][1]
s2_d = build_subpath(s2_start, [c[0] for c in cubics[12:27]])
s3_start = cubics[27][1]
s3_d = build_subpath(s3_start, [c[0] for c in cubics[27:]])

with open("scratch/test_imola_sectors.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 727" style="background:#111;">
    <g transform="translate(-407.16077,-399.05715)">
        <g transform="translate(428.36066,391.76854)">
            <path d="{s1_d}" fill="none" stroke="#f59e0b" stroke-width="12" />
            <path d="{s2_d}" fill="none" stroke="#3b82f6" stroke-width="12" />
            <path d="{s3_d}" fill="none" stroke="#10b981" stroke-width="12" />
        </g>
    </g>
</svg>''')

print("Imola sectors built successfully")
