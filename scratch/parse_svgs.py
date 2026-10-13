import xml.etree.ElementTree as ET

files = ['lemans', 'spa', 'imola', 'fuji', 'fuji_alt']

for name in files:
    try:
        tree = ET.parse(f"scratch/{name}.svg")
        root = tree.getroot()
        viewBox = root.attrib.get('viewBox', 'no viewBox')
        width = root.attrib.get('width', 'no width')
        height = root.attrib.get('height', 'no height')
        print(f"=== {name} ===")
        print(f"Dimensions: w={width}, h={height}, viewBox={viewBox}")
        paths = root.findall('.//{http://www.w3.org/2000/svg}path') + root.findall('.//path')
        print(f"Found {len(paths)} paths")
        for i, p in enumerate(paths[:5]):
            d = p.attrib.get('d', '')
            stroke = p.attrib.get('stroke', '')
            fill = p.attrib.get('fill', '')
            pid = p.attrib.get('id', '')
            print(f"  path[{i}] id='{pid}' stroke='{stroke}' fill='{fill}' d_len={len(d)} d_start={d[:60]}...")
    except Exception as e:
        print(f"Error {name}: {e}")
