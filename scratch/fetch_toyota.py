import urllib.request, ssl, re
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
req = urllib.request.Request('https://racer.com/2017/03/31/toyota-reveals-its-2017-ts050-hybrid/', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
for match in re.finditer(r'<img[^>]+src="([^"]+\.jpg)"', html):
    print(match.group(1))
