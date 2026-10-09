import urllib.request, ssl, re
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
html = urllib.request.urlopen(urllib.request.Request('https://www.stuttcars.com/porsche-911-rsr-991-2-2017-2019/', headers={'User-Agent': 'Mozilla/5.0'}), context=ctx).read().decode('utf-8')
matches = re.findall(r'<img[^>]+src=[\"\'](https://[^\"\']+\.jpg)[\"\'][^>]*>', html)
for m in matches:
    print(m)
