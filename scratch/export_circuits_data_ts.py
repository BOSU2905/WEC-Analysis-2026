import xml.etree.ElementTree as ET
import re
import json

# 1. Le Mans
with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lm_cmds = re.findall(r'([a-zA-Z][^a-zA-Z]*)', lm_d)

def trace_subpaths(cmds, split_indices):
    cur_x, cur_y = 0.0, 0.0
    subpaths = []
    current_cmds = []
    for i, cmd_str in enumerate(cmds):
        c = cmd_str[0]
        nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', cmd_str)]
        if c == 'M':
            cur_x, cur_y = nums[0], nums[1]
        elif c == 'm':
            cur_x += nums[0]
            cur_y += nums[1]
        elif c in ('C', 'c'):
            for j in range(0, len(nums), 6):
                if c == 'C':
                    cur_x, cur_y = nums[j+4], nums[j+5]
                else:
                    cur_x += nums[j+4]
                    cur_y += nums[j+5]
        current_cmds.append(cmd_str)
        if i in split_indices:
            subpaths.append("".join(current_cmds))
            current_cmds = [f"M{cur_x:.3f},{cur_y:.3f}"]
    if current_cmds:
        subpaths.append("".join(current_cmds))
    return subpaths

lm_sectors = trace_subpaths(lm_cmds, [19, 32])

# 2. Spa
with open("scratch/spa.svg") as f:
    spa_root = ET.fromstring(f.read())
spa_track = spa_root.find('.//*[@id="path2840"]').attrib['d']
spa_s1 = spa_root.find('.//*[@id="path5814"]').attrib['d']
spa_s2 = spa_root.find('.//*[@id="path5818"]').attrib['d']
spa_s3 = spa_root.find('.//*[@id="path5820"]').attrib['d']

# 3. Imola
with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']
nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', im_d)]
cur_x, cur_y = nums[0], nums[1]
cubics = []
idx = 2
while idx + 6 <= len(nums):
    dx3, dy3 = nums[idx+4], nums[idx+5]
    cubics.append((nums[idx:idx+6], (cur_x, cur_y)))
    cur_x += dx3
    cur_y += dy3
    idx += 6

def build_subpath(start_pt, segments):
    res = [f"M {start_pt[0]:.3f},{start_pt[1]:.3f} c"]
    for seg in segments:
        res.append(f" {seg[0]:.3f},{seg[1]:.3f} {seg[2]:.3f},{seg[3]:.3f} {seg[4]:.3f},{seg[5]:.3f}")
    return "".join(res)

imola_s1 = build_subpath((nums[0], nums[1]), [c[0] for c in cubics[0:12]])
imola_s2 = build_subpath(cubics[12][1], [c[0] for c in cubics[12:27]])
imola_s3 = build_subpath(cubics[27][1], [c[0] for c in cubics[27:]])

# 4. Fuji
with open("scratch/fuji_alt.svg") as f:
    fuji_root = ET.fromstring(f.read())
fuji_track = fuji_root.find('.//*[@id="path2609"]').attrib['d']
fuji_s1 = fuji_root.find('.//*[@id="path3974"]').attrib['d']
fuji_s2 = fuji_root.find('.//*[@id="path3982"]').attrib['d']
fuji_s3 = fuji_root.find('.//*[@id="path3978"]').attrib['d']

print("All track and sector paths prepared.")
