import urllib.request
import ssl
from bs4 import BeautifulSoup
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def get_html(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def download_image(url, filename):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filename, 'wb') as f:
                f.write(response.read())
            print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {url} to {filename}: {e}")

# 1. Oreca 07
html = get_html("https://it.wikipedia.org/wiki/Oreca_07")
if html:
    soup = BeautifulSoup(html, 'html.parser')
    img_tag = soup.select_one('.infobox img')
    if img_tag:
        img_url = "https:" + img_tag['src'].replace('260px-', '1024px-')
        download_image(img_url, "web/public/assets/machines/oreca-07-gibson.jpg")

# 2. Aston Martin
html = get_html("https://motors.all-free-photos.com/show/showphoto.php?idph=PI83300&lang=en")
if html:
    soup = BeautifulSoup(html, 'html.parser')
    img_tag = soup.select_one('#imghr')
    if img_tag:
        img_url = "https://motors.all-free-photos.com" + img_tag['src']
        download_image(img_url, "web/public/assets/machines/aston-martin-vantage-v8.jpg")

# 3. Porsche 911 RSR
html = get_html("https://www.stuttcars.com/porsche-911-rsr-991-2-2017-2019/")
if html:
    soup = BeautifulSoup(html, 'html.parser')
    # Find the main hero image or first content image
    img_tag = soup.select_one('.entry-content img')
    if img_tag:
        img_url = img_tag.get('src') or img_tag.get('data-src')
        if img_url:
            download_image(img_url, "web/public/assets/machines/porsche-911-rsr.jpg")

# 4. Toyota TS050
html = get_html("https://commons.wikimedia.org/wiki/File:TOYOTA_GAZOO_Racing_-_Toyota_TS050_Hybrid_-5_%2827726936021%29.jpg")
if html:
    soup = BeautifulSoup(html, 'html.parser')
    img_tag = soup.select_one('.fullImageLink img')
    if img_tag:
        img_url = img_tag['src']
        if img_url.startswith('//'):
            img_url = 'https:' + img_url
        download_image(img_url, "web/public/assets/machines/toyota-ts050-hybrid.jpg")
