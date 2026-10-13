import re

with open('web/src/data/circuits_data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'id:\s*"fuji".*?trackPath:\s*"([^"]+)"', content, re.DOTALL)
if m:
    track = m.group(1)
    new_track = re.sub(r'^m\s*[-0-9.]+,[-0-9.]+', 'm 1315.88667,1365.27033', track)
    
    # Let's compute actual coordinates of the path
    # Commands are: m x,y c dx1,dy1 dx2,dy2 dx,dy ...
    tokens = re.split(r'([a-zA-Z])', new_track)
    cur_x, cur_y = 0.0, 0.0
    pts = []
    i = 1
    while i < len(tokens):
        cmd = tokens[i]
        args_str = tokens[i+1].strip() if i+1 < len(tokens) else ''
        i += 2
        nums = [float(n) for n in re.findall(r'[-+]?[0-9]*\.?[0-9]+', args_str)]
        if cmd == 'm':
            cur_x = nums[0]
            cur_y = nums[1]
            pts.append((cur_x, cur_y))
        elif cmd == 'c':
            for j in range(0, len(nums), 6):
                if j+5 < len(nums):
                    cur_x += nums[j+4]
                    cur_y += nums[j+5]
                    pts.append((cur_x, cur_y))
        elif cmd == 'l':
            for j in range(0, len(nums), 2):
                if j+1 < len(nums):
                    cur_x += nums[j]
                    cur_y += nums[j+1]
                    pts.append((cur_x, cur_y))
    
    # Translate points by groupTransform: translate(-1288.2294, -918.78876)
    gx, gy = -1288.2294, -918.78876
    x_coords = [p[0] + gx for p in pts]
    y_coords = [p[1] + gy for p in pts]
    print(f"Total points: {len(pts)}")
    print(f"X bounds in viewBox (0 0 1400 480): min={min(x_coords):.2f}, max={max(x_coords):.2f}")
    print(f"Y bounds in viewBox (0 0 1400 480): min={min(y_coords):.2f}, max={max(y_coords):.2f}")
