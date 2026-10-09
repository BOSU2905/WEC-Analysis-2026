import urllib.request
import ssl
import re
import time

urls = {
    'oreca': 'https://it.wikipedia.org/wiki/Oreca_07',
    'aston': 'https://motors.all-free-photos.com/show/showphoto.php?idph=PI83300&lang=en',
    'porsche911': 'https://www.stuttcars.com/porsche-911-rsr-991-2-2017-2019/',
    'toyota': 'https://commons.wikimedia.org/wiki/File:TOYOTA_GAZOO_Racing_-_Toyota_TS050_Hybrid_-5_%2827726936021%29.jpg',
    'oreca_side': 'https://en.wikipedia.org/wiki/Jackie_Chan_DC_Racing',
    'aston_side': 'https://sportscar365.com/lemans/wec/gulf-racing-set-for-fia-wec-return-in-gte-am/',
    'toyota_side': 'https://racer.com/2017/03/31/toyota-reveals-its-2017-ts050-hybrid/',
    'porsche911_side': 'https://www.carracingreporter.com/home/wec-porsche-911rsr-10years',
    'porsche919_side': 'https://www.stuttcars.com/porsche-919-hybrid-2015/'
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for key, url in urls.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            html = response.read().decode('utf-8', errors='ignore')
            print(f'\n--- {key} ---')
            
            # Use basic regex to grab image src values
            imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
            
            # Filter and resolve relative urls
            for i, img in enumerate(imgs):
                if img.startswith('data:'):
                    continue
                if img.startswith('//'): 
                    img = 'https:' + img
                elif img.startswith('/'): 
                    img = url.split('/', 3)[0] + '//' + url.split('/')[2] + img
                elif not img.startswith('http'):
                    continue
                
                # Print only first 15 valid images to avoid console spam
                print(f'{i}: {img}')
                if i >= 15:
                    break
    except Exception as e:
        print(f'Failed {key}: {e}')
    time.sleep(1)
