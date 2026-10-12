import urllib.request
import json
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'WECAnalysisResearchProject/1.0 (academic motorsport analytics; student@university.edu)'}

titles = [
    'File:Circuit_de_la_sarthe_track_map.svg',
    'File:Circuit_de_la_Sarthe.svg',
    'File:Spa-Francorchamps_of_Belgium.svg',
    'File:Imola_2009.svg',
    'File:Autodromo_Internazionale_Enzo_e_Dino_Ferrari_track_map.svg',
    'File:Circuit_Fuji.svg',
    'File:Fuji.svg'
]

for title in titles:
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
    try:
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, pdata in pages.items():
                if 'imageinfo' in pdata:
                    url = pdata['imageinfo'][0]['url']
                    print(f"{title} -> {url}")
                else:
                    print(f"{title} -> Missing imageinfo")
    except Exception as e:
        print(f"Error {title}: {e}")
    time.sleep(1.5)
