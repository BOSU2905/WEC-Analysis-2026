import urllib.request
import urllib.parse
import json
import ssl

ctx = ssl._create_unverified_context()

def search_photographer(term, query="", limit=10):
    search_q = f'"{term}" {query}' if query else f'"{term}"'
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": search_q,
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
                desc = ext.get("ImageDescription", {}).get("value", "")
                results.append({
                    "title": title,
                    "img_url": img_url,
                    "desc_url": desc_url,
                    "width": width,
                    "height": height,
                    "artist": artist,
                    "license": license_name,
                    "license_url": license_url,
                    "description": desc[:200] if desc else ""
                })
            return results
    except Exception as e:
        print(f"Error searching {search_q}: {e}")
        return []

if __name__ == "__main__":
    searches = [
        ("David Merrett", "WEC OR \"Le Mans\" pit"),
        ("David Merrett", "WEC OR \"Le Mans\" night"),
        ("David Merrett", "WEC OR \"Le Mans\" grid"),
        ("David Merrett", "Porsche 919"),
        ("United Autosports", "Le Mans pit"),
        ("Kevin Decherf", "Le Mans"),
        ("Martin Lee", "WEC OR \"Le Mans\""),
        ("Pyrope", "Silverstone WEC")
    ]
    for artist, q in searches:
        print(f"\n==================== {artist} : {q} ====================")
        res = search_photographer(artist, q, limit=6)
        for r in res:
            print(f"- {r['title']}")
            print(f"  Artist: {r['artist'][:60]}")
            print(f"  License: {r['license']} ({r['license_url']})")
            print(f"  Dims: {r['width']}x{r['height']}")
            print(f"  Page: {r['desc_url']}")
            print(f"  URL: {r['img_url']}\n")
