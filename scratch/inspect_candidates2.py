import urllib.request
import urllib.parse
import json
import ssl
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()
headers = {"User-Agent": "WECFilmstripBot/1.0 (https://github.com/wec-analysis; contact@example.com)"}

titles = [
    "File:2020 24 Hours of Le Mans - Race Start.jpg",
    "File:Toyota TS050 Alonso Silverstone 2018.jpg",
    "File:2013 24 Hours of Le Mans 5585 (9120999792).jpg",
    "File:Car Guy Racing's Ferrari 488 GTE about to be overtaken by Porsche GT Team's Porsche 911 RSR (48127003662).jpg",
    "File:WEC 2014 Silverstone 6 hrs - -8 Toyota TS 040 LMP1 HY - Davidson Lapiere Buemi (13957909844).jpg",
    "File:Porsche Team - Porsche 919 Hybrid -1 (27191064873).jpg",
    "File:United-autosports-le-mans-race-128.jpg",
    "File:United-Autosports-Le-Mans-2017-82 (35340856665) (2).jpg",
    "File:Oak Racing's Morgan Nissan and Toyota Racing's Toyota TS030 Hybrid (8669458258).jpg",
    "File:Aston Martin Racing's Aston Martin Vantage GTE Driven by Darren Turner, Jonathan Adam and Daniel Serra (36205683035).jpg"
]

titles_str = "|".join(titles)
api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(titles_str)}&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200&format=json"

time.sleep(2.0)
req = urllib.request.Request(api_url, headers=headers)
with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
    data = json.loads(resp.read().decode('utf-8'))

pages = data.get("query", {}).get("pages", {})
for page in pages.values():
    if "imageinfo" not in page:
        print(f"No imageinfo for {page.get('title')}")
        continue
    ii = page["imageinfo"][0]
    meta = ii.get("extmetadata", {})
    title = page.get("title")
    w = ii.get("width")
    h = ii.get("height")
    artist = meta.get("Artist", {}).get("value", "Unknown")[:50]
    license_name = meta.get("LicenseShortName", {}).get("value", "Unknown")
    license_url = meta.get("LicenseUrl", {}).get("value", "Unknown")
    desc = meta.get("ImageDescription", {}).get("value", "")[:120]
    print(f"\n* Title: {title}")
    print(f"  Dimensions: {w}x{h}")
    print(f"  License: {license_name} | URL: {license_url}")
    print(f"  Artist: {artist}")
    print(f"  Desc: {desc}")
    print(f"  Thumb: {ii.get('thumburl')}")
