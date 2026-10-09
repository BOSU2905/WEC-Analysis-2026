from rembg import remove
import os

images = [
    ('scratch/raw_porsche-919-hybrid-side.png', 'web/public/assets/machines/porsche-919-hybrid-side.png'),
    ('web/public/assets/machines/toyota-ts050-hybrid.jpg', 'web/public/assets/machines/toyota-ts050-hybrid-side.png'),
    ('web/public/assets/machines/porsche-911-rsr.jpg', 'web/public/assets/machines/porsche-911-rsr-side.png'),
    ('web/public/assets/machines/oreca-07-gibson.jpg', 'web/public/assets/machines/oreca-07-gibson-side.png'),
    ('web/public/assets/machines/aston-martin-vantage-v8.jpg', 'web/public/assets/machines/aston-martin-vantage-v8-side.png')
]

for in_path, out_path in images:
    if os.path.exists(in_path):
        print(f"Processing {in_path} -> {out_path}")
        with open(in_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
    else:
        print(f"Warning: {in_path} does not exist.")
