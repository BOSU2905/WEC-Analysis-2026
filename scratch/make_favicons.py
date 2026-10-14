import base64
from PIL import Image

# Generate 32x32, 192x192 favicon PNGs
d = Image.open('web/public/assets/branding/monogram_dark.png')

size = 256
icon = Image.new('RGBA', (size, size), (9, 10, 11, 255))
target_w = 216
target_h = int(d.height * (target_w / d.width))
d_resized = d.resize((target_w, target_h), Image.Resampling.LANCZOS)
y_offset = (size - target_h) // 2
icon.alpha_composite(d_resized, ((size - target_w) // 2, y_offset))

icon.save('web/public/favicon.png', format='PNG')
icon_32 = icon.resize((32, 32), Image.Resampling.LANCZOS)
icon_32.save('web/public/favicon-32x32.png', format='PNG')

with open('web/public/assets/branding/monogram_dark.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <rect width="128" height="128" rx="28" fill="#090A0B"/>
  <image href="data:image/png;base64,{b64}" x="8" y="38" width="112" height="52" preserveAspectRatio="xMidYMid meet" />
</svg>'''

with open('web/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Favicon assets generated successfully.')
