import json
import struct

def print_gltf_metadata(filename):
    print(f"\n--- {filename} ---")
    with open('public/assets/machines/3d/' + filename, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF':
            print("Not a glTF file")
            return
        version = struct.unpack('<I', f.read(4))[0]
        length = struct.unpack('<I', f.read(4))[0]
        chunk_len = struct.unpack('<I', f.read(4))[0]
        chunk_type = f.read(4)
        if chunk_type != b'JSON':
            print("First chunk is not JSON")
            return
        json_data = f.read(chunk_len).decode('utf-8')
        try:
            gltf = json.loads(json_data)
            print("Asset:", json.dumps(gltf.get("asset", {}), indent=2))
        except Exception as e:
            print("JSON parse error:", e)

for f in ['2012_aston_martin_vantage_gte.glb', '2018_porsche_911_rsr.glb', 'porsche_919_hybrid.glb']:
    print_gltf_metadata(f)
