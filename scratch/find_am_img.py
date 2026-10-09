import urllib.request, ssl, re
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
req = urllib.request.Request('https://motors.all-free-photos.com/show/showphoto.php?idph=PI83300&lang=en', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req, context=ctx).read().decode('latin-1')
print(re.findall(r'img[^>]+src=[\"\'](.*?)[\"\']', html))
