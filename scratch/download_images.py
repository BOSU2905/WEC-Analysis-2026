import urllib.request
import ssl
import os

images = {
    'aston-martin-vantage-v8.jpg': 'https://motors.all-free-photos.com/images/aston-martin/PI83300-hr.jpg',
    'porsche-911-rsr.jpg': 'https://www.stuttcars.com/wp-content/uploads/2021/08/Stuttcars-1-1024x538.jpg',
    'oreca-07-gibson.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Le_Mans_24_Hours_2017_%2834575990263%29.jpg',
    'toyota-ts050-hybrid.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/TOYOTA_GAZOO_Racing_-_Toyota_TS050_Hybrid_-5_%2827726936021%29.jpg',
    
    'raw_porsche-919-hybrid-side.png': 'https://www.stuttcars.com/wp-content/uploads/2021/06/2015-Porsche-919-Hybrid-Profile-Large-500x375.png',
    'raw_toyota-ts050-hybrid-side.jpg': 'https://racer.com/wp-content/uploads/sites/85/2018/01/toyota2017ts050_22384.jpg',
    'raw_porsche-911-rsr-side.jpg': 'https://images.squarespace-cdn.com/content/v1/5903b913ff7c505ddcb017de/0ed863de-5b23-455b-b9f4-124b81c4af70/2017-0013-le-mans-16x9.jpg?format=1000w',
    'raw_oreca-07-gibson-side.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/cd/2019_4_Hours_of_Silverstone_-_37_Jackie_Chan_DC_Racing.jpg',
    'raw_aston-martin-vantage-v8-side.jpg': 'https://motors.all-free-photos.com/images/aston-martin/PI83300-hr.jpg'
}

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in images.items():
    print(f'Downloading {name}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(name, 'wb') as f:
                f.write(response.read())
    except Exception as e:
        print(f'Failed {name}: {e}')
