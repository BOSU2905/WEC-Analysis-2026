import urllib.request
import urllib.parse
import json
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()

def search_commons(query, limit=10):
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": 6,
        "gsrlimit": limit,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
    }
    url = f"https://commons.wikimedia.org/w/api.php?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "WECResearchBot/1.0 (contact: test@example.com)"})
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        pages = data.get("query", {}).get("pages", {})
        results = []
        for page_id, page in pages.items():
            title = page.get("title", "")
            imageinfo = page.get("imageinfo", [{}])[0]
            ext = imageinfo.get("extmetadata", {})
            results.append({
                "title": title,
                "url": imageinfo.get("url", ""),
                "desc_url": imageinfo.get("descriptionurl", ""),
                "width": imageinfo.get("width", 0),
                "height": imageinfo.get("height", 0),
                "artist": ext.get("Artist", {}).get("value", ""),
                "license": ext.get("LicenseShortName", {}).get("value", ""),
                "license_url": ext.get("LicenseUrl", {}).get("value", ""),
                "desc": ext.get("ImageDescription", {}).get("value", ""),
                "date": ext.get("DateTimeOriginal", {}).get("value", "")
            })
        return results

if __name__ == "__main__":
    queries = [
        '"AF Corse" "Ferrari 488 GTE" Silverstone OR "Le Mans"',
        '"Aston Martin Vantage GTE" Silverstone OR Spa 201',
        '"Toyota TS050" Silverstone OR Spa OR Fuji 201',
        '"Porsche 911 RSR" Silverstone OR Spa OR "Le Mans" 201',
        '"Oreca 07" Silverstone OR Spa OR "Le Mans" 201',
        '"24 Hours of Le Mans" night 201'
    ]
    for q in queries:
        print(f"\n==================== {q} ====================")
        res = search_commons(q, limit=5)
        for r in res:
            print(f"- {r['title']}")
            print(f"  Artist: {r['artist'][:80]}")
            print(f"  License: {r['license']} ({r['license_url']})")
            print(f"  Date: {r['date']}")
            print(f"  Dims: {r['width']}x{r['height']}")
            print(f"  Desc: {r['desc'][:140]}")
            print(f"  Page: {r['desc_url']}")
            print(f"  URL: {r['url']}\n")
