
import numpy as np
from PIL import Image

def analyze_shot(img_path, name):
    im = Image.open(img_path)
    arr = np.array(im)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    X, Y = np.meshgrid(np.arange(arr.shape[1]), np.arange(arr.shape[0]))

    # Find dots
    top = (b > 120) & (g > 110) & (X < arr.shape[1]*0.6) & (Y < arr.shape[0]*0.6) & (r < 140) & (g > r)
    lmp = (b > 120) & (X > arr.shape[1]*0.4) & (Y < arr.shape[0]*0.6) & (r < 140)
    gt  = (r > 130) & (g > 110) & (b < 120) & (r > b + 20) & (Y > arr.shape[0]*0.3)
    exp = (g > 120) & (X < arr.shape[1]*0.35) & (Y > arr.shape[0]*0.4) & (g > b + 10) & (g > r + 10)

    all_dots = top | lmp | gt | exp
    ys, xs = np.where(all_dots)
    if len(xs) == 0:
        print(f'{name}: No dots found')
        return

    w = xs.max() - xs.min()
    h = ys.max() - ys.min()
    cx = (xs.min() + xs.max()) / 2
    cy = (ys.min() + ys.max()) / 2
    print(f'=== {name} ===')
    print(f'  BBox: X=[{xs.min()}, {xs.max()}] (W={w}), Y=[{ys.min()}, {ys.max()}] (H={h})')
    print(f'  Center: ({cx:.1f}, {cy:.1f})')
    print(f'  Image size: W={arr.shape[1]}, H={arr.shape[0]}')

analyze_shot('scratch/live_desktop_settled.png', 'Desktop (1440x900)')
analyze_shot('scratch/live_tablet_settled.png', 'Tablet (768x1024)')
analyze_shot('scratch/live_mobile_settled.png', 'Mobile (390x844)')
