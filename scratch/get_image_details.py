import urllib.request
import urllib.parse
import json
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()

def get_file_info(titles):
    params = {
        "action": "query",
        "format": "json",
        "titles": "|".join(titles),
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata|comment",
    }
    url = f"https://commons.wikimedia.org/w/api.php?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "WECResearchBot/1.0 (contact: test@example.com)"})
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        pages = data.get("query", {}).get("pages", {})
        results = {}
        for page_id, page in pages.items():
            title = page.get("title", "")
            imageinfo = page.get("imageinfo", [{}])[0]
            ext = imageinfo.get("extmetadata", {})
            results[title] = {
                "title": title,
                "url": imageinfo.get("url", ""),
                "desc_url": imageinfo.get("descriptionurl", ""),
                "width": imageinfo.get("width", 0),
                "height": imageinfo.get("height", 0),
                "artist": ext.get("Artist", {}).get("value", ""),
                "license": ext.get("LicenseShortName", {}).get("value", ""),
                "license_url": ext.get("LicenseUrl", {}).get("value", ""),
                "object_name": ext.get("ObjectName", {}).get("value", ""),
                "description": ext.get("ImageDescription", {}).get("value", ""),
                "date": ext.get("DateTimeOriginal", {}).get("value", ""),
                "categories": ext.get("Categories", {}).get("value", "")
            }
        return results

if __name__ == "__main__":
    titles = [
        "File:United-autosports-le-mans-race-053.jpg",
        "File:United-autosports-le-mans-race-128.jpg",
        "File:2020 24 Hours of Le Mans starting grid.jpg",
        "File:Audi Sport Team Joest pit stop practice (no1) 2012 WEC Fuji.jpg",
        "File:Audi Sport Team Joest pit stop practice 2012 WEC Fuji.jpg",
        "File:Porsche Team - Porsche 919 Hybrid -1 (27191064873).jpg"
    ]
    details = get_file_info(titles)
    for t, d in details.items():
        print(f"=== {t} ===")
        print(f"Artist: {d['artist']}")
        print(f"License: {d['license']} ({d['license_url']})")
        print(f"Date: {d['date']}")
        print(f"Dimensions: {d['width']}x{d['height']}")
        print(f"Desc: {d['description'][:200]}")
        print(f"URL: {d['url']}")
        print(f"Page: {d['desc_url']}\n")
