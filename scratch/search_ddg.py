import urllib.request, ssl, re
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
req = urllib.request.Request('https://html.duckduckgo.com/html/?q=Oreca+07+side+profile+view+car', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
for match in re.finditer(r'<img[^>]+src="([^"]+)"', html):
    url = match.group(1)
    if url.startswith('//'): url = 'https:' + url
    print(url)
