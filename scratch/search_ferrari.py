import urllib.request
import urllib.parse
import json
import ssl
import sys

sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl._create_unverified_context()

def get_query(q):
    params = {
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrsearch": q,
        "gsrnamespace": 6,
        "gsrlimit": 6,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
    }
    url = f"https://commons.wikimedia.org/w/api.php?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "WECResearchBot/1.0 (contact: test@example.com)"})
    with urllib.request.urlopen(req, context=ctx) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        pages = data.get("query", {}).get("pages", {})
        for page_id, page in pages.items():
            title = page.get("title", "")
            imageinfo = page.get("imageinfo", [{}])[0]
            ext = imageinfo.get("extmetadata", {})
            print(f"- Title: {title}")
            print(f"  Artist: {ext.get('Artist', {}).get('value', '')[:100]}")
            print(f"  License: {ext.get('LicenseShortName', {}).get('value', '')} ({ext.get('LicenseUrl', {}).get('value', '')})")
            print(f"  Date: {ext.get('DateTimeOriginal', {}).get('value', '')}")
            print(f"  Dims: {imageinfo.get('width')}x{imageinfo.get('height')}")
            print(f"  Desc: {ext.get('ImageDescription', {}).get('value', '')[:150]}")
            print(f"  Page: {imageinfo.get('descriptionurl', '')}")
            print(f"  URL: {imageinfo.get('url', '')}\n")

if __name__ == "__main__":
    print("=== Ferrari 488 GTE ===")
    get_query('"AF Corse Ferrari 488 GTE"')
    print("=== Multiclass WEC action ===")
    get_query('"WEC" Silverstone "2018" OR "2019" Oreca OR Porsche OR Ferrari')
