import urllib.request
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WECResearch/1.0'
}

urls = {
    'lemans': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Circuit_de_la_Sarthe.svg',
    'spa': 'https://upload.wikimedia.org/wikipedia/commons/5/54/Spa-Francorchamps_of_Belgium.svg',
    'imola': 'https://upload.wikimedia.org/wikipedia/commons/2/22/Imola_2009.svg',
    'fuji': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Circuit_Fuji.svg',
    'fuji_alt': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Fuji.svg'
}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = resp.read()
            with open(f"scratch/{name}.svg", "wb") as f:
                f.write(data)
            print(f"Downloaded {name}: {len(data)} bytes")
    except Exception as e:
        print(f"Failed {name}: {e}")
    time.sleep(2)
