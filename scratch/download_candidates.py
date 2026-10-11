import urllib.request
import os
import ssl

ctx = ssl._create_unverified_context()

candidates = {
    "grid_lemans_2020.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3b/2020_24_Hours_of_Le_Mans_starting_grid.jpg",
    "pit_stop_lemans_2019.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/99/United-autosports-le-mans-race-053.jpg",
    "porsche_919_night.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Porsche_Team_-_Porsche_919_Hybrid_-1_%2827191064873%29.jpg",
    "pit_refuel_lemans_2019.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fd/United-autosports-le-mans-race-128.jpg",
    "ferrari_488_gte_51.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/03/The_No._51_AF_Corse_Ferrari_488_GTE_Evo_%28LMGTE_Pro%29_-_2019_24_Hours_of_Le_Mans.jpg",
    "aston_martin_gte_98.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Aston_Martin_Vantage_GTE_Lauda_Silverstone_2018.jpg",
    "toyota_ts050_alonso.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/96/Toyota_TS050_Alonso_Silverstone_2018_Village.jpg",
    "porsche_911_rsr_92.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Porsche_GT_Team%27s_Porsche_911_RSR_No._92_Michael_Christensen_and_Kevin_Estre.jpg",
    "oreca_07_high_class.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/23/WEC_2019_4_Hours_of_Silverstone_-_No._33_High_Class_Racing.jpg"
}

out_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\candidates"
os.makedirs(out_dir, exist_ok=True)

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Referer": "https://commons.wikimedia.org/"
}

import time

for filename, url in candidates.items():
    dest = os.path.join(out_dir, filename)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already downloaded: {filename}")
        continue
    print(f"Downloading {filename} from {url}...")
    success = False
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx) as resp:
                content = resp.read()
                with open(dest, "wb") as f:
                    f.write(content)
            print(f"Saved {filename} ({len(content)} bytes)")
            success = True
            time.sleep(2.5)
            break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {filename}: {e}")
            time.sleep(3.0 * (attempt + 1))
    if not success:
        print(f"Failed permanently for {filename}")
