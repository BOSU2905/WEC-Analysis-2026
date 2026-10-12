import json
import struct
import os

def analyze_glb(path):
    print("=" * 80)
    print(f"ANALYZING: {path} ({os.path.getsize(path)/(1024*1024):.2f} MB)")
    print("=" * 80)
    with open(path, 'rb') as f:
        magic, version, length = struct.unpack('<4sII', f.read(12))
        chunk_len, chunk_type = struct.unpack('<I4s', f.read(8))
        json_data = json.loads(f.read(chunk_len).decode('utf-8'))
        
        # Binary chunk
        bin_len, bin_type = struct.unpack('<I4s', f.read(8))
        print(f"JSON Chunk Length: {chunk_len/1024:.1f} KB")
        print(f"BIN Chunk Length : {bin_len/(1024*1024):.2f} MB")
        
        images = json_data.get('images', [])
        print(f"Number of images: {len(images)}")
        total_img_size = 0
        for i, img in enumerate(images):
            bv_idx = img.get('bufferView')
            if bv_idx is not None:
                bv = json_data['bufferViews'][bv_idx]
                byte_len = bv['byteLength']
                total_img_size += byte_len
                print(f"  Image {i} ({img.get('name', 'unnamed')}, {img.get('mimeType', 'unknown')}): {byte_len/1024:.1f} KB")
        print(f"Total embedded textures size: {total_img_size/(1024*1024):.2f} MB")

        meshes = json_data.get('meshes', [])
        accessors = json_data.get('accessors', [])
        print(f"Number of meshes: {len(meshes)}")
        print(f"Number of accessors: {len(accessors)}")

for glb in [
    'web/public/assets/machines/3d/toyota_ts050_hybrid.glb',
    'web/public/assets/machines/3d/2012_aston_martin_vantage_gte.glb',
    'web/public/assets/machines/3d/2018_porsche_911_rsr.glb',
    'web/public/assets/machines/3d/porsche_919_hybrid_2015.glb'
]:
    analyze_glb(glb)
