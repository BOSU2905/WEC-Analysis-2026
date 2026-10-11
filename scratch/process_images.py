from PIL import Image
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

candidates_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\candidates"
editorial_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\web\src\assets\editorial"
filmstrip_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\web\src\assets\filmstrip"

import shutil

os.makedirs(editorial_dir, exist_ok=True)
os.makedirs(filmstrip_dir, exist_ok=True)

backup_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\backup_filmstrip"
os.makedirs(backup_dir, exist_ok=True)
for item in os.listdir(filmstrip_dir):
    src = os.path.join(filmstrip_dir, item)
    dst = os.path.join(backup_dir, item)
    if not os.path.exists(dst):
        shutil.copy2(src, dst)

def crop_and_resize(src_path, dest_path, target_width, target_height, quality=85):
    with Image.open(src_path) as img:
        img = img.convert("RGB")
        src_w, src_h = img.size
        target_ratio = target_width / target_height
        src_ratio = src_w / src_h

        if src_ratio > target_ratio:
            # Source is wider than target: crop left/right
            new_w = int(src_h * target_ratio)
            left = (src_w - new_w) // 2
            top = 0
            right = left + new_w
            bottom = src_h
        else:
            # Source is taller than target: crop top/bottom
            new_h = int(src_w / target_ratio)
            left = 0
            top = (src_h - new_h) // 2
            right = src_w
            bottom = top + new_h

        cropped = img.crop((left, top, right, bottom))
        resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
        resized.save(dest_path, "WEBP", quality=quality, method=6)
        file_size = os.path.getsize(dest_path)
        print(f"Generated {os.path.basename(dest_path)}: {target_width}x{target_height} ({file_size / 1024:.1f} KB)")

# 1. Editorial images for Chapter 00
editorial_targets = [
    ("grid_lemans_2020.jpg", os.path.join(editorial_dir, "wec-starting-grid.webp"), 1600, 1067),
    ("pit_stop_lemans_2019.jpg", os.path.join(editorial_dir, "wec-pit-operations.webp"), 1600, 1067),
]

print("Processing Editorial Images:")
for src_fn, dest_path, w, h in editorial_targets:
    src_path = os.path.join(candidates_dir, src_fn)
    crop_and_resize(src_path, dest_path, w, h, quality=88)

# 2. Filmstrip images (01.webp - 08.webp)
filmstrip_mapping = [
    ("porsche_919_night.jpg", "01.webp"),
    ("toyota_ts050_alonso.jpg", "02.webp"),
    ("pit_refuel_lemans_2019.jpg", "03.webp"),
    ("ferrari_488_gte_51.jpg", "04.webp"),
    ("aston_martin_gte_98.jpg", "05.webp"),
    ("porsche_911_rsr_92.jpg", "06.webp"),
    ("oreca_07_high_class.jpg", "07.webp"),
    ("grid_lemans_2020.jpg", "08.webp"),
]

print("\nProcessing Filmstrip Images:")
for src_fn, dest_fn in filmstrip_mapping:
    src_path = os.path.join(candidates_dir, src_fn)
    dest_path = os.path.join(filmstrip_dir, dest_fn)
    crop_and_resize(src_path, dest_path, 800, 533, quality=84)
