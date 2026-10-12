import xml.etree.ElementTree as ET
import re

def compute_bounds(d_str):
    # Parse numbers following coordinate pairs
    # Note: in SVG paths, command letters are followed by numbers.
    # To get rough bounding box of all numbers, we can find all numbers:
    nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', d_str)]
    # Filter out potential flags (0 or 1 in arc commands) if any
    return min(nums), max(nums)

# More accurate: let's track pen position for absolute and relative commands!
def track_pen_positions(d_str):
    tokens = re.findall(r'([a-zA-Z])|([-+]?(?:\d*\.\d+|\d+))', d_str)
    cur_x = 0.0
    cur_y = 0.0
    pts = []
    cmd = ''
    nums = []
    
    for t in tokens:
        if t[0]: # command letter
            if nums:
                # process previous
                pass
            cmd = t[0]
            nums = []
        else: # number
            nums.append(float(t[1]))
            if cmd in ('M', 'm'):
                if len(nums) == 2:
                    if cmd == 'M':
                        cur_x, cur_y = nums[0], nums[1]
                    else:
                        cur_x += nums[0]
                        cur_y += nums[1]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('L', 'l'):
                if len(nums) == 2:
                    if cmd == 'L':
                        cur_x, cur_y = nums[0], nums[1]
                    else:
                        cur_x += nums[0]
                        cur_y += nums[1]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('C', 'c'):
                if len(nums) == 6:
                    if cmd == 'C':
                        cur_x, cur_y = nums[4], nums[5]
                    else:
                        cur_x += nums[4]
                        cur_y += nums[5]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('S', 's', 'Q', 'q'):
                if len(nums) == 4:
                    if cmd in ('S', 'Q'):
                        cur_x, cur_y = nums[2], nums[3]
                    else:
                        cur_x += nums[2]
                        cur_y += nums[3]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('H', 'h'):
                if len(nums) == 1:
                    if cmd == 'H':
                        cur_x = nums[0]
                    else:
                        cur_x += nums[0]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('V', 'v'):
                if len(nums) == 1:
                    if cmd == 'V':
                        cur_y = nums[0]
                    else:
                        cur_y += nums[0]
                    pts.append((cur_x, cur_y))
                    nums = []
            elif cmd in ('Z', 'z'):
                nums = []
    
    if pts:
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        return min(xs), min(ys), max(xs), max(ys), pts
    return 0, 0, 0, 0, []

# Test with our tracks
with open("scratch/lemans.svg", "r") as f:
    lemans_root = ET.fromstring(f.read())
lemans_path = lemans_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lx1, ly1, lx2, ly2, lpts = track_pen_positions(lemans_path)
print(f"Le Mans bounds: x=[{lx1:.1f}, {lx2:.1f}], y=[{ly1:.1f}, {ly2:.1f}], w={lx2-lx1:.1f}, h={ly2-ly1:.1f}")

with open("scratch/spa.svg", "r") as f:
    spa_root = ET.fromstring(f.read())
spa_path = spa_root.find('.//*[@id="path2840"]').attrib['d']
sx1, sy1, sx2, sy2, spts = track_pen_positions(spa_path)
print(f"Spa bounds: x=[{sx1:.1f}, {sx2:.1f}], y=[{sy1:.1f}, {sy2:.1f}], w={sx2-sx1:.1f}, h={sy2-sy1:.1f}")

with open("scratch/imola.svg", "r") as f:
    imola_root = ET.fromstring(f.read())
imola_path = imola_root.find('.//*[@id="path2582"]').attrib['d']
ix1, iy1, ix2, iy2, ipts = track_pen_positions(imola_path)
print(f"Imola bounds: x=[{ix1:.1f}, {ix2:.1f}], y=[{iy1:.1f}, {iy2:.1f}], w={ix2-ix1:.1f}, h={iy2-iy1:.1f}")

with open("scratch/fuji_alt.svg", "r") as f:
    fuji_root = ET.fromstring(f.read())
fuji_path = fuji_root.find('.//*[@id="path2609"]').attrib['d']
fx1, fy1, fx2, fy2, fpts = track_pen_positions(fuji_path)
print(f"Fuji bounds: x=[{fx1:.1f}, {fx2:.1f}], y=[{fy1:.1f}, {fy2:.1f}], w={fx2-fx1:.1f}, h={fy2-fy1:.1f}")
