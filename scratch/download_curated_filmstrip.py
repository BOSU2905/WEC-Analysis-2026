import urllib.request
import urllib.parse
import json
import ssl
import sys
import os
import time
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {"User-Agent": "WECFilmstripBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

# Sequence of 8 curated photos:
curated_sequence = [
    {
        "slot": "01.webp",
        "role": "Opening atmosphere / Race start in motion",
        "title": "File:2020 24 Hours of Le Mans - Race Start.jpg",
        "crop_focus": "center" # (start down pit straight)
    },
    {
        "slot": "02.webp",
        "role": "Prototype speed / Aerodynamic cornering",
        "title": "File:Toyota TS050 Alonso Silverstone 2018.jpg",
        "crop_focus": "center"
    },
    {
        "slot": "03.webp",
        "role": "Wheel-to-wheel prototype combat",
        "title": "File:Oak Racing's Morgan Nissan and Toyota Racing's Toyota TS030 Hybrid (8669458258).jpg",
        "crop_focus": "center"
    },
    {
        "slot": "04.webp",
        "role": "Multiclass overtaking / Prototype passing GT",
        "title": "File:2013 24 Hours of Le Mans 5585 (9120999792).jpg",
        "crop_focus": "center"
    },
    {
        "slot": "05.webp",
        "role": "GT wheel-to-wheel battle",
        "title": "File:Car Guy Racing's Ferrari 488 GTE about to be overtaken by Porsche GT Team's Porsche 911 RSR (48127003662).jpg",
        "crop_focus": "center"
    },
    {
        "slot": "06.webp",
        "role": "Night tension / Headlights and darkness",
        "title": "File:Porsche Team - Porsche 919 Hybrid -1 (27191064873).jpg",
        "crop_focus": "center"
    },
    {
        "slot": "07.webp",
        "role": "Human intensity / Pit choreography & refuelling",
        "title": "File:United-autosports-le-mans-race-128.jpg",
        "crop_focus": "center"
    },
    {
        "slot": "08.webp",
        "role": "Extreme conditions / Torrential rain & spray",
        "title": "File:WEC 2014 Silverstone 6 hrs - -8 Toyota TS 040 LMP1 HY - Davidson Lapiere Buemi (13957909844).jpg",
        "crop_focus": "center"
    }
]

# Fetch metadata in a single batch query
titles = [item["title"] for item in curated_sequence]
titles_str = "|".join(titles)
api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(titles_str)}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1600&format=json"

print("Fetching metadata from Wikimedia Commons API...")
api_data = None
for attempt in range(5):
    try:
        time.sleep(3.0 * (attempt + 1))
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            api_data = json.loads(resp.read().decode('utf-8'))
        break
    except Exception as e:
        print(f"Attempt {attempt+1} failed: {e}")
        time.sleep(5.0 * (attempt + 1))

if not api_data:
    print("Could not fetch API data after retries!")
    sys.exit(1)

pages = api_data.get("query", {}).get("pages", {})
meta_by_title = {}
for p in pages.values():
    if "imageinfo" in p:
        meta_by_title[p.get("title")] = p

raw_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\curated_raw"
filmstrip_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\web\src\assets\filmstrip"
os.makedirs(raw_dir, exist_ok=True)
os.makedirs(filmstrip_dir, exist_ok=True)

processed_metadata = []

for item in curated_sequence:
    title = item["title"]
    slot = item["slot"]
    role = item["role"]
    page = meta_by_title.get(title)
    if not page:
        print(f"Error: title {title} not found in API response!")
        continue

    ii = page["imageinfo"][0]
    ext = ii.get("extmetadata", {})
    thumb_url = ii.get("thumburl") or ii.get("url")
    full_url = ii.get("url")
    desc_url = ii.get("descriptionurl")

    artist_raw = ext.get("Artist", {}).get("value", "Unknown")
    license_name = ext.get("LicenseShortName", {}).get("value", "Unknown")
    license_url = ext.get("LicenseUrl", {}).get("value", "Unknown")
    desc = ext.get("ImageDescription", {}).get("value", "")

    # Clean artist HTML tags
    import re
    clean_artist = re.sub(r'<[^>]+>', '', artist_raw).strip()
    if "davehamster" in artist_raw or "David Merrett" in artist_raw:
        clean_artist = "David Merrett"
    elif "Pyrope" in artist_raw or "John Chapman" in artist_raw:
        clean_artist = "John Chapman"
    elif "United Autosports" in artist_raw:
        clean_artist = "United Autosports"
    elif "Kevin Decherf" in artist_raw or "27191064873" in artist_raw:
        clean_artist = "Kevin Decherf"

    print(f"\nProcessing {slot} ({role}):")
    print(f"  Title: {title}")
    print(f"  Artist: {clean_artist}")
    print(f"  License: {license_name} ({license_url})")

    # Download source image
    raw_dest = os.path.join(raw_dir, slot.replace(".webp", ".jpg"))
    if not os.path.exists(raw_dest) or os.path.getsize(raw_dest) < 1000:
        download_success = False
        for dl_attempt in range(5):
            try:
                time.sleep(2.5 * (dl_attempt + 1))
                print(f"  Downloading from {thumb_url[:80]}...")
                treq = urllib.request.Request(thumb_url, headers=headers)
                with urllib.request.urlopen(treq, context=ctx, timeout=30) as r:
                    img_data = r.read()
                with open(raw_dest, "wb") as f:
                    f.write(img_data)
                print(f"  Saved raw {os.path.basename(raw_dest)} ({len(img_data)} bytes)")
                download_success = True
                break
            except Exception as e:
                print(f"  Download attempt {dl_attempt+1} failed: {e}")
                time.sleep(4.0 * (dl_attempt + 1))
        if not download_success:
            print(f"Permanent failure downloading {slot}!")
            continue
    else:
        print(f"  Using existing raw {os.path.basename(raw_dest)}")

    # Crop and resize to 800x533 (exact 3:2 ratio)
    target_w, target_h = 800, 533
    target_ratio = target_w / target_h

    with Image.open(raw_dest) as img:
        img = img.convert("RGB")
        sw, sh = img.size
        s_ratio = sw / sh

        if s_ratio > target_ratio:
            # Crop width
            new_w = int(sh * target_ratio)
            left = (sw - new_w) // 2
            top = 0
            cropped = img.crop((left, top, left + new_w, sh))
        else:
            # Crop height
            new_h = int(sw / target_ratio)
            top = (sh - new_h) // 2
            left = 0
            cropped = img.crop((left, top, sw, top + new_h))

        resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
        webp_dest = os.path.join(filmstrip_dir, slot)
        resized.save(webp_dest, "WEBP", quality=86, method=6)
        file_size = os.path.getsize(webp_dest)
        print(f"  -> Generated {slot}: {target_w}x{target_h} ({file_size / 1024:.1f} KB)")

    processed_metadata.append({
        "slot": slot,
        "role": role,
        "title": title,
        "artist": clean_artist,
        "license_name": license_name,
        "license_url": license_url,
        "source_url": desc_url or f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}",
        "direct_url": full_url
    })

meta_out_path = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\curated_metadata.json"
with open(meta_out_path, "w", encoding="utf-8") as f:
    json.dump(processed_metadata, f, indent=2)
print("\nWrote curated metadata to scratch/curated_metadata.json!")
