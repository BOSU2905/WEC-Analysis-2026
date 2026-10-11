import urllib.request
import ssl
import sys
import os
import time
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://commons.wikimedia.org/"
}

downloads = [
    {
        "slot": "01.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/2020_24_Hours_of_Le_Mans_-_Race_Start.jpg/1280px-2020_24_Hours_of_Le_Mans_-_Race_Start.jpg",
        "local_raw": None,
        "name": "2020 Le Mans Race Start in Motion"
    },
    {
        "slot": "02.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Toyota_TS050_Alonso_Silverstone_2018.jpg/1280px-Toyota_TS050_Alonso_Silverstone_2018.jpg",
        "local_raw": None,
        "name": "Toyota TS050 Alonso Silverstone 2018"
    },
    {
        "slot": "03.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Oak_Racing%27s_Morgan_Nissan_and_Toyota_Racing%27s_Toyota_TS030_Hybrid_%288669458258%29.jpg/1280px-Oak_Racing%27s_Morgan_Nissan_and_Toyota_Racing%27s_Toyota_TS030_Hybrid_%288669458258%29.jpg",
        "local_raw": None,
        "name": "Morgan LMP2 vs Toyota TS030 Prototype Battle"
    },
    {
        "slot": "04.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/2013_24_Hours_of_Le_Mans_5585_%289120999792%29.jpg/1280px-2013_24_Hours_of_Le_Mans_5585_%289120999792%29.jpg",
        "local_raw": None,
        "name": "Morgan LMP2 Overtaking Ferrari 458 GTE"
    },
    {
        "slot": "05.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Car_Guy_Racing%27s_Ferrari_488_GTE_about_to_be_overtaken_by_Porsche_GT_Team%27s_Porsche_911_RSR_%2848127003662%29.jpg/1280px-Car_Guy_Racing%27s_Ferrari_488_GTE_about_to_be_overtaken_by_Porsche_GT_Team%27s_Porsche_911_RSR_%2848127003662%29.jpg",
        "local_raw": None,
        "name": "Ferrari 488 GTE Hunted by Porsche 911 RSR"
    },
    {
        "slot": "06.webp",
        "url": None,
        "local_raw": r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\candidates\porsche_919_night.jpg",
        "name": "Porsche 919 Hybrid Night at Le Mans"
    },
    {
        "slot": "07.webp",
        "url": None,
        "local_raw": r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\candidates\pit_refuel_lemans_2019.jpg",
        "name": "United Autosports Le Mans Pit Refuelling"
    },
    {
        "slot": "08.webp",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/WEC_2014_Silverstone_6_hrs_-_-8_Toyota_TS_040_LMP1_HY_-_Davidson_Lapiere_Buemi_%2813957909844%29.jpg/1280px-WEC_2014_Silverstone_6_hrs_-_-8_Toyota_TS_040_LMP1_HY_-_Davidson_Lapiere_Buemi_%2813957909844%29.jpg",
        "local_raw": None,
        "name": "Toyota TS040 in the Wet Rain and Spray"
    }
]

raw_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\curated_raw"
filmstrip_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\web\src\assets\filmstrip"
os.makedirs(raw_dir, exist_ok=True)
os.makedirs(filmstrip_dir, exist_ok=True)

target_w, target_h = 800, 533
target_ratio = target_w / target_h

for item in downloads:
    slot = item["slot"]
    url = item["url"]
    name = item["name"]
    local_raw = item["local_raw"]

    raw_path = os.path.join(raw_dir, slot.replace(".webp", ".jpg"))

    if local_raw and os.path.exists(local_raw):
        print(f"Using pre-downloaded raw for {slot} ({name})", flush=True)
        raw_path = local_raw
    else:
        if not os.path.exists(raw_path) or os.path.getsize(raw_path) < 1000:
            print(f"Downloading {slot} ({name})...", flush=True)
            success = False
            for attempt in range(4):
                try:
                    time.sleep(2.0)
                    req = urllib.request.Request(url, headers=headers)
                    with urllib.request.urlopen(req, context=ctx, timeout=25) as resp:
                        data = resp.read()
                    with open(raw_path, "wb") as f:
                        f.write(data)
                    print(f"  Saved raw {slot} ({len(data)} bytes)", flush=True)
                    success = True
                    break
                except Exception as e:
                    print(f"  Attempt {attempt+1} failed for {slot}: {e}", flush=True)
                    time.sleep(3.0 * (attempt + 1))
            if not success:
                print(f"FAILED permanently to download {slot}!", flush=True)
                continue
        else:
            print(f"Already cached raw for {slot} ({name})", flush=True)

    # Crop and optimize to WebP 800x533 (3:2)
    with Image.open(raw_path) as img:
        img = img.convert("RGB")
        sw, sh = img.size
        s_ratio = sw / sh

        if s_ratio > target_ratio:
            new_w = int(sh * target_ratio)
            left = (sw - new_w) // 2
            cropped = img.crop((left, 0, left + new_w, sh))
        else:
            new_h = int(sw / target_ratio)
            top = (sh - new_h) // 2
            cropped = img.crop((0, top, sw, top + new_h))

        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        out_webp = os.path.join(filmstrip_dir, slot)
        resized.save(out_webp, "WEBP", quality=86, method=6)
        print(f"-> Generated {slot}: {target_w}x{target_h} ({os.path.getsize(out_webp) / 1024:.1f} KB)", flush=True)

print("\nAll 8 curated filmstrip assets generated successfully!", flush=True)
