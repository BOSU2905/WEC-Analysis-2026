import os
import sys
import subprocess
import urllib.request
import re
from PIL import Image

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import rembg
except ImportError:
    print("Installing rembg...")
    install('rembg')
    import rembg

try:
    import requests
except ImportError:
    install('requests')
    import requests

try:
    from bs4 import BeautifulSoup
except ImportError:
    install('beautifulsoup4')
    from bs4 import BeautifulSoup

def download_image(url, output_path, use_bs4_for_wikimedia=False):
    print(f"Downloading {url} to {output_path}")
    if use_bs4_for_wikimedia:
        # fetch the page and extract the full image link
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        # Find the original image link on Wikimedia Commons
        link = soup.find('a', href=re.compile(r'upload\.wikimedia\.org/wikipedia/commons/.*\.jpg$'))
        if not link:
            link = soup.find('a', href=re.compile(r'upload\.wikimedia\.org/wikipedia/commons/.*\.jpeg$'))
        
        if link:
            img_url = link['href']
            print(f"Found wikimedia actual image: {img_url}")
            img_data = requests.get(img_url, headers=headers).content
            with open(output_path, 'wb') as f:
                f.write(img_data)
        else:
            print("Could not find full image on Wikimedia Commons!")
    else:
        headers = {'User-Agent': 'Mozilla/5.0'}
        try:
            response = requests.get(url, headers=headers, stream=True)
            if response.status_code == 200:
                with open(output_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
            else:
                print(f"Failed to download {url}, status: {response.status_code}")
        except Exception as e:
            print(f"Error downloading {url}: {e}")

def remove_background(input_path, output_path, flip=False):
    print(f"Removing background from {input_path} to {output_path}")
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
            output_data = rembg.remove(input_data)
            with open(output_path, 'wb') as o:
                o.write(output_data)
        
        if flip:
            img = Image.open(output_path)
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
            img.save(output_path)
            print(f"Flipped image {output_path}")
            
    except Exception as e:
        print(f"Failed to remove background for {input_path}: {e}")


assets_dir = r"c:\WEC Analysis (Updated Version)\WEC-Analysis-2026\WEC-Analysis-2026\web\public\assets\machines"
os.makedirs(assets_dir, exist_ok=True)
temp_dir = os.path.join(assets_dir, "temp")
os.makedirs(temp_dir, exist_ok=True)

downloads = [
    # A. Oreca 07 — Gibson
    {"type": "main", "url": "https://enduranceracing.co.uk/wp-content/uploads/2017/04/009-WEC-GBR-SIL-FP3-15-04-2017.jpg", "out": "oreca-07-gibson.jpg"},
    {"type": "side", "url": "https://sportscar365.com/wp-content/uploads/2017/07/dcjackiechan.jpg", "out": "oreca-07-gibson-side.png", "temp": "oreca-side.jpg"},
    
    # B. Aston Martin Vantage V8 — 2014
    {"type": "main", "url": "https://motors.all-free-photos.com/images/spa-6h-2014/PI83300-hr.jpg", "out": "aston-martin-vantage-v8.jpg"},
    {"type": "side", "url": "https://sportscar365.com/wp-content/uploads/2014/12/0Dagys_-2013_64385.jpg", "out": "aston-martin-vantage-v8-side.png", "temp": "aston-side.jpg"},
    
    # C. Porsche 911 RSR
    {"type": "main", "url": "https://www.stuttcars.com/wp-content/uploads/2021/11/Porsche-911-RSR-991.2.png", "out": "porsche-911-rsr.png"},
    {"type": "side", "url": "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/porsche_newsroom/Motorsport/2018-Motorsport-Saison/2018-WEC/Spa-Francorchamps/Freies-Training/M18_1186_fine.jpg/jcr:content/M18_1186_fine.jpg", "out": "porsche-911-rsr-side.png", "temp": "rsr-side.jpg"},
    
    # D. Toyota TS050 Hybrid — LMP1-H
    {"type": "main_wiki", "url": "https://commons.wikimedia.org/wiki/File:TOYOTA_GAZOO_Racing_-_Toyota_TS050_Hybrid_-5_%2827726936021%29.jpg", "out": "toyota-ts050-hybrid.jpg"},
    {"type": "side", "url": "https://toyotagazooracing.com/pages/contents/en/assets/images/wec/car_detail/2017/car_side_image.jpg", "out": "toyota-ts050-hybrid-side.png", "temp": "toyota-side.jpg"},
    
    # E. Porsche 919 Hybrid — LMP1-H
    {"type": "main", "url": "https://sport-auto.ch/wp-content/uploads/2015/03/M15_0209_fine.jpg", "out": "porsche-919-hybrid.jpg"},
    {"type": "side", "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9qQWS_I6r3deC-qoQKiPUXMdUznoQwSnxaRvS2q81BhpcAzcIj-QxdbU&s=10", "out": "porsche-919-hybrid-side.png", "temp": "919-side.jpg", "flip": True} # we will check if it needs flip
]

for d in downloads:
    out_path = os.path.join(assets_dir, d['out'])
    if d['type'] == 'main':
        download_image(d['url'], out_path)
    elif d['type'] == 'main_wiki':
        download_image(d['url'], out_path, use_bs4_for_wikimedia=True)
    elif d['type'] == 'side':
        temp_file = os.path.join(temp_dir, d['temp'])
        download_image(d['url'], temp_file)
        if os.path.exists(temp_file):
            remove_background(temp_file, out_path, flip=d.get('flip', False))

print("Done processing images.")

