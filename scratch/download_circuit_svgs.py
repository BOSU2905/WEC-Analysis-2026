import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) WECAnalysisResearch/1.0'}

files = {
    'lemans': 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Circuit_de_la_Sarthe_track_map.svg',
    'lemans_alt': 'https://upload.wikimedia.org/wikipedia/commons/2/23/Circuit_de_la_sarthe_rev12_enlabels.svg',
    'spa': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Spa-Francorchamps_of_Belgium.svg',
    'imola': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Imola_2009.svg',
    'fuji': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Circuit_Fuji.svg',
    'fuji_alt': 'https://upload.wikimedia.org/wikipedia/commons/1/15/GrandPrix_Circuit_Fuji_2007.svg'
}

for name, url in files.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp:
            content = resp.read()
            with open(f"scratch/{name}.svg", "wb") as f:
                f.write(content)
            print(f"Downloaded {name}: {len(content)} bytes")
    except Exception as e:
        print(f"Failed {name}: {e}")
