import urllib.request
import urllib.parse
import json
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {"User-Agent": "WECFilmstripBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

import time

def get_batch_info(titles):
    titles_str = "|".join(titles)
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(titles_str)}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200&format=json"
    for attempt in range(4):
        try:
            time.sleep(2.5)
            req = urllib.request.Request(api_url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                data = json.loads(resp.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            results = []
            for page in pages.values():
                if "imageinfo" not in page:
                    print(f"No imageinfo for page: {page.get('title')}")
                    continue
                ii = page["imageinfo"][0]
                meta = ii.get("extmetadata", {})
                results.append({
                    "title": page.get("title"),
                    "width": ii.get("width"),
                    "height": ii.get("height"),
                    "thumburl": ii.get("thumburl"),
                    "url": ii.get("url"),
                    "artist": meta.get("Artist", {}).get("value"),
                    "license": meta.get("LicenseShortName", {}).get("value"),
                    "license_url": meta.get("LicenseUrl", {}).get("value"),
                    "description": meta.get("ImageDescription", {}).get("value")
                })
            return results
        except urllib.error.HTTPError as e:
            print(f"Attempt {attempt+1} HTTP error: {e}")
            time.sleep(4.0 * (attempt + 1))
        except Exception as e:
            print(f"Attempt {attempt+1} error: {e}")
            time.sleep(3.0 * (attempt + 1))
    return []

def search_files(query, limit=15):
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit={limit}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=800&format=json"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        pages = data.get("query", {}).get("pages", {})
        results = []
        for p in pages.values():
            if "imageinfo" in p:
                ii = p["imageinfo"][0]
                meta = ii.get("extmetadata", {})
                results.append({
                    "title": p.get("title"),
                    "width": ii.get("width"),
                    "height": ii.get("height"),
                    "thumburl": ii.get("thumburl"),
                    "url": ii.get("url"),
                    "artist": meta.get("Artist", {}).get("value"),
                    "license": meta.get("LicenseShortName", {}).get("value"),
                    "license_url": meta.get("LicenseUrl", {}).get("value"),
                    "desc": meta.get("ImageDescription", {}).get("value", "")[:100]
                })
        return results
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

candidates = [
    "File:Car Guy Racing's Ferrari 488 GTE about to be overtaken by Porsche GT Team's Porsche 911 RSR (48127003662).jpg",
    "File:Toyota TS050 Alonso Silverstone 2018.jpg",
    "File:United-Autosports-Le-Mans-2017-82 (35340856665) (2).jpg",
    "File:United-autosports-le-mans-race-053.jpg",
    "File:United-autosports-le-mans-race-128.jpg",
    "File:Porsche Team - Porsche 919 Hybrid -1 (27191064873).jpg"
]

print("=== CHECKING INITIAL CANDIDATES ===")
batch_results = get_batch_info(candidates)
for info in batch_results:
    print(f"\nTitle: {info['title']}")
    print(f"  Dimensions: {info['width']}x{info['height']}")
    print(f"  Artist: {info['artist'][:60] if info['artist'] else 'None'}")
    print(f"  License: {info['license']} ({info['license_url']})")
    print(f"  Thumb: {info['thumburl'][:100]}")
