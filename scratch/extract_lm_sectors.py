import xml.etree.ElementTree as ET
import re

with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lm_cmds = re.findall(r'([a-zA-Z][^a-zA-Z]*)', lm_d)

def trace_subpaths(cmds, split_indices):
    # Returns path strings for each split
    cur_x, cur_y = 0.0, 0.0
    subpaths = []
    current_cmds = []
    
    for i, cmd_str in enumerate(cmds):
        c = cmd_str[0]
        nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', cmd_str)]
        
        # calculate end position
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
print("Le Mans Sectors:", len(lm_sectors))
for i, s in enumerate(lm_sectors):
    print(f"  S{i+1} len={len(s)} start={s[:40]}...")

# Test SVG
with open("scratch/test_lm_sectors.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 753" style="background:#111;">
    <path d="{lm_sectors[0]}" fill="none" stroke="#f59e0b" stroke-width="8" />
    <path d="{lm_sectors[1]}" fill="none" stroke="#3b82f6" stroke-width="8" />
    <path d="{lm_sectors[2]}" fill="none" stroke="#10b981" stroke-width="8" />
</svg>''')
print("Generated test_lm_sectors.svg")
