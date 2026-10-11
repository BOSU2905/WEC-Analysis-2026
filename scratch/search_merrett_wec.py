import urllib.request
import urllib.parse
import json
import ssl
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {"User-Agent": "WECFilmstripBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

search_queries = [
    "\"David Merrett\" \"Le Mans\"",
    "\"David Merrett\" \"WEC\"",
    "\"Morgan LMP2\" \"Ferrari 458\" \"overtaking\"",
    "\"Toyota TS 040\" \"Silverstone\" \"wet\"",
    "\"United Autosports\" \"Le Mans\" \"pit\"",
    "\"2020 24 Hours of Le Mans\" \"Race Start\"",
    "Porsche 919 night Le Mans",
    "Ferrari 488 GTE Porsche 911 RSR 48127003662"
]

for q in search_queries:
    time.sleep(1.5)
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(q)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=800&format=json"
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
                desc = meta.get("ImageDescription", {}).get("value", "")[:100]
                print(f"  * {title}")
                print(f"    Dimensions: {ii.get('width')}x{ii.get('height')} | License: {license_name} | By: {artist}")
                print(f"    Desc: {desc}")
    except Exception as e:
        print(f"Error querying {q}: {e}")
