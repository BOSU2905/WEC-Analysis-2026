import urllib.request
import json
import ssl
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

ctx = ssl._create_unverified_context()

files = [
    {
        "filename": "ferrari_488_gte_51.jpg",
        "title": "File:The No. 51 AF Corse Ferrari 488 GTE Evo (LMGTE Pro) - 2019 24 Hours of Le Mans.jpg"
    },
    {
        "filename": "aston_martin_gte_98.jpg",
        "title": "File:Aston Martin Vantage GTE Lauda Silverstone 2018.jpg"
    },
    {
        "filename": "toyota_ts050_alonso.jpg",
        "title": "File:Toyota TS050 Alonso Silverstone 2018 Village.jpg"
    },
    {
        "filename": "porsche_911_rsr_92.jpg",
        "title": "File:Porsche GT Team's Porsche 911 RSR No. 92 Michael Christensen and Kevin Estre.jpg"
    },
    {
        "filename": "oreca_07_high_class.jpg",
        "title": "File:WEC 2019 4 Hours of Silverstone - No. 33 High Class Racing.jpg"
    },
    {
        "filename": "pit_refuel_lemans_2019.jpg",
        "title": "File:United-autosports-le-mans-race-128.jpg"
    },
    {
        "filename": "audi_r18_spa_2016.jpg",
        "title": "File:2016 WEC 6 Hours of Spa - Audi R18 #7.jpg"
    },
    {
        "filename": "rebellion_r13_2019.jpg",
        "title": "File:Rebellion R13 - Gibson No.1 Rebellion Racing (48667520977).jpg"
    }
]

out_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\scratch\candidates"
os.makedirs(out_dir, exist_ok=True)

api_headers = {"User-Agent": "WECAnalysisResearchBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

import time

for item in files:
    fn = item["filename"]
    title = item["title"]
    dest = os.path.join(out_dir, fn)
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {fn}")
        continue
    
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1920&format=json"
    success = False
    for attempt in range(4):
        try:
            time.sleep(2.5)
            req = urllib.request.Request(api_url, headers=api_headers)
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                data = json.loads(resp.read().decode('utf-8'))
            
            pages = data.get("query", {}).get("pages", {})
            page = list(pages.values())[0]
            if "imageinfo" not in page:
                print(f"Error: no imageinfo for {title}")
                break
            
            ii = page["imageinfo"][0]
            thumb_url = ii.get("thumburl") or ii.get("url")
            meta = ii.get("extmetadata", {})
            
            artist = meta.get("Artist", {}).get("value", "Unknown")
            license_name = meta.get("LicenseShortName", {}).get("value", "Unknown")
            license_url = meta.get("LicenseUrl", {}).get("value", "Unknown")
            
            print(f"Fetching {fn} from {thumb_url[:80]}...")
            print(f"  Artist: {artist[:60]} | License: {license_name} | URL: {license_url}")
            
            time.sleep(2.0)
            treq = urllib.request.Request(thumb_url, headers=api_headers)
            with urllib.request.urlopen(treq, context=ctx, timeout=20) as resp:
                img_data = resp.read()
            
            with open(dest, "wb") as f:
                f.write(img_data)
            print(f"  Saved {fn} ({len(img_data)} bytes)")
            success = True
            break
        except urllib.error.HTTPError as e:
            print(f"Attempt {attempt+1} HTTP error for {fn}: {e}")
            time.sleep(5.0 * (attempt + 1))
        except Exception as e:
            print(f"Attempt {attempt+1} error for {fn}: {e}")
            time.sleep(3.0 * (attempt + 1))
    if not success:
        print(f"Failed {fn}")
