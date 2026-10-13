import json
import xml.etree.ElementTree as ET
import re

# Helper to parse SVG path into discrete polyline points for precise corner picking
def parse_path_to_points(d_str, samples_per_curve=10):
    tokens = re.findall(r'([a-zA-Z])|([-+]?(?:\d*\.\d+|\d+))', d_str)
    cur_x, cur_y = 0.0, 0.0
    start_x, start_y = 0.0, 0.0
    pts = []
    cmd = ''
    nums = []

    def handle_cmd():
        nonlocal cur_x, cur_y, start_x, start_y, nums
        if cmd == 'M':
            while len(nums) >= 2:
                cur_x, cur_y = nums[0], nums[1]
                start_x, start_y = cur_x, cur_y
                pts.append((cur_x, cur_y))
                nums = nums[2:]
        elif cmd == 'm':
            while len(nums) >= 2:
                cur_x += nums[0]
                cur_y += nums[1]
                start_x, start_y = cur_x, cur_y
                pts.append((cur_x, cur_y))
                nums = nums[2:]
        elif cmd == 'L':
            while len(nums) >= 2:
                cur_x, cur_y = nums[0], nums[1]
                pts.append((cur_x, cur_y))
                nums = nums[2:]
        elif cmd == 'l':
            while len(nums) >= 2:
                cur_x += nums[0]
                cur_y += nums[1]
                pts.append((cur_x, cur_y))
                nums = nums[2:]
        elif cmd == 'H':
            while len(nums) >= 1:
                cur_x = nums[0]
                pts.append((cur_x, cur_y))
                nums = nums[1:]
        elif cmd == 'h':
            while len(nums) >= 1:
                cur_x += nums[0]
                pts.append((cur_x, cur_y))
                nums = nums[1:]
        elif cmd == 'V':
            while len(nums) >= 1:
                cur_y = nums[0]
                pts.append((cur_x, cur_y))
                nums = nums[1:]
        elif cmd == 'v':
            while len(nums) >= 1:
                cur_y += nums[0]
                pts.append((cur_x, cur_y))
                nums = nums[1:]
        elif cmd in ('C', 'c'):
            while len(nums) >= 6:
                if cmd == 'C':
                    p1x, p1y = nums[0], nums[1]
                    p2x, p2y = nums[2], nums[3]
                    p3x, p3y = nums[4], nums[5]
                else:
                    p1x, p1y = cur_x + nums[0], cur_y + nums[1]
                    p2x, p2y = cur_x + nums[2], cur_y + nums[3]
                    p3x, p3y = cur_x + nums[4], cur_y + nums[5]
                p0x, p0y = cur_x, cur_y
                for step in range(1, samples_per_curve + 1):
                    t = step / samples_per_curve
                    bx = (1-t)**3 * p0x + 3*(1-t)**2 * t * p1x + 3*(1-t) * t**2 * p2x + t**3 * p3x
                    by = (1-t)**3 * p0y + 3*(1-t)**2 * t * p1y + 3*(1-t) * t**2 * p2y + t**3 * p3y
                    pts.append((bx, by))
                cur_x, cur_y = p3x, p3y
                nums = nums[6:]
        elif cmd in ('Z', 'z'):
            cur_x, cur_y = start_x, start_y
            pts.append((cur_x, cur_y))
            nums = []

    for t in tokens:
        if t[0]:
            if cmd and nums:
                handle_cmd()
            cmd = t[0]
            nums = []
        else:
            nums.append(float(t[1]))
            # Handle commands greedily
            if cmd in ('M', 'm', 'L', 'l') and len(nums) == 2:
                handle_cmd()
            elif cmd in ('H', 'h', 'V', 'v') and len(nums) == 1:
                handle_cmd()
            elif cmd in ('C', 'c') and len(nums) == 6:
                handle_cmd()
    if cmd and nums:
        handle_cmd()
    return pts

# Test parsing Le Mans
with open("scratch/lemans.svg") as f:
    lemans_root = ET.fromstring(f.read())
lemans_d = lemans_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lm_pts = parse_path_to_points(lemans_d)
print(f"Le Mans sampled points: {len(lm_pts)}")

# Find specific corners on Le Mans
# 1. Start / Finish Line: near beginning M8.7, 235.6
# 2. Dunlop Curve: x~20-30, y~90-120
# 3. Dunlop Chicane: x~35-45, y~70-90
# 4. Tertre Rouge: x~100-140, y~30-50
# 5. Mulsanne Straight First Chicane (Chicane Forza Motorsport): x~180-210, y~260-290
# 6. Mulsanne Straight Second Chicane (Chicane Michelin): x~220-250, y~430-460
# 7. Mulsanne Corner (Virage de Mulsanne): x~260-275, y~640-660
# 8. Indianapolis: x~140-165, y~660-690
# 9. Arnage: x~85-105, y~600-620
# 10. Porsche Curves: x~35-70, y~430-530
# 11. Maison Blanche: x~20-35, y~320-360
# 12. Ford Chicanes: x~8-25, y~250-280

def find_closest(pts, target_x, target_y):
    best = None
    min_dist = float('inf')
    for p in pts:
        d = (p[0] - target_x)**2 + (p[1] - target_y)**2
        if d < min_dist:
            min_dist = d
            best = p
    return best, min_dist**0.5

print("Dunlop Chicane:", find_closest(lm_pts, 40, 80))
print("Tertre Rouge:", find_closest(lm_pts, 130, 35))
print("Forza Chicane:", find_closest(lm_pts, 195, 275))
print("Michelin Chicane:", find_closest(lm_pts, 235, 445))
print("Mulsanne Corner:", find_closest(lm_pts, 268, 650))
print("Indianapolis:", find_closest(lm_pts, 155, 680))
print("Arnage:", find_closest(lm_pts, 95, 610))
print("Porsche Curves:", find_closest(lm_pts, 45, 480))
print("Ford Chicanes:", find_closest(lm_pts, 15, 260))
