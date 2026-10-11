import urllib.request
import urllib.parse
import json
import ssl
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {"User-Agent": "WECFilmstripBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

queries = [
    "WEC overtaking",
    "Le Mans overtaking",
    "FIA WEC rain",
    "24 Hours of Le Mans rain",
    "WEC wet",
    "Le Mans night headlights",
    "24 Heures du Mans night",
    "FIA WEC start",
    "WEC multiclass traffic",
    "Audi R18 Le Mans night",
    "Porsche 919 Le Mans night",
    "Toyota TS050 Le Mans rain",
    "Rebellion R13 Le Mans",
    "GTE battle Le Mans"
]

for q in queries:
    time.sleep(1.5)
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=800&format=json"
    req = urllib.request.Request(api_url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        pages = data.get("query", {}).get("pages", {})
        print(f"\n=== Query: {q} ({len(pages)} results) ===")
        for p in pages.values():
            if "imageinfo" in p:
                ii = p["imageinfo"][0]
                meta = ii.get("extmetadata", {})
                title = p.get("title")
                artist = meta.get("Artist", {}).get("value", "Unknown")[:40]
                license_name = meta.get("LicenseShortName", {}).get("value", "Unknown")
                desc = meta.get("ImageDescription", {}).get("value", "")[:80]
                print(f"  * {title}")
                print(f"    License: {license_name} | By: {artist} | {desc}")
    except Exception as e:
        print(f"Error querying {q}: {e}")
