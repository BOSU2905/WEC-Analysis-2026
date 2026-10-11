import urllib.request
import urllib.parse
import json
import ssl

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
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            pages = data.get("query", {}).get("pages", {})
            results = []
            for page_id, page in pages.items():
                title = page.get("title", "")
                imageinfo = page.get("imageinfo", [{}])[0]
                img_url = imageinfo.get("url", "")
                desc_url = imageinfo.get("descriptionurl", "")
                width = imageinfo.get("width", 0)
                height = imageinfo.get("height", 0)
                ext = imageinfo.get("extmetadata", {})
                artist = ext.get("Artist", {}).get("value", "")
                license_name = ext.get("LicenseShortName", {}).get("value", "")
                license_url = ext.get("LicenseUrl", {}).get("value", "")
                usage_terms = ext.get("UsageTerms", {}).get("value", "")
                desc = ext.get("ImageDescription", {}).get("value", "")
                results.append({
                    "title": title,
                    "img_url": img_url,
                    "desc_url": desc_url,
                    "width": width,
                    "height": height,
                    "artist": artist,
                    "license": license_name or usage_terms,
                    "license_url": license_url,
                    "description": desc[:200] if desc else ""
                })
            return results
    except Exception as e:
        print(f"Error querying {query}: {e}")
        return []

if __name__ == "__main__":
    queries = [
        '"pit stop" "Le Mans" 201',
        '"pit stop" "FIA WEC"',
        '"starting grid" "Le Mans"',
        '"race start" "Le Mans"',
        '"24 Heures du Mans" night 201',
        'Porsche 919 Hybrid night',
        'Ferrari 488 GTE WEC',
        'Aston Martin Vantage GTE Le Mans'
    ]
    for q in queries:
        print(f"\n=== Query: {q} ===")
        res = search_commons(q, limit=4)
        for r in res:
            print(f"- Title: {r['title']}")
            print(f"  Artist: {r['artist'][:120]}")
            print(f"  License: {r['license']} ({r['license_url']})")
            print(f"  Dimensions: {r['width']}x{r['height']}")
            print(f"  URL: {r['img_url']}")
            print(f"  Page: {r['desc_url']}")
