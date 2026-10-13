import xml.etree.ElementTree as ET

def find_main_paths(filename):
    print(f"\n==================== {filename} ====================")
    tree = ET.parse(filename)
    root = tree.getroot()
    for el in root.iter():
        tag = el.tag.split('}')[-1]
        if tag == 'path':
            pid = el.attrib.get('id', '')
            d = el.attrib.get('d', '')
            stroke = el.attrib.get('stroke', '')
            style = el.attrib.get('style', '')
            if len(d) > 800:
                print(f"Path id='{pid}' len={len(d)} style={style} d_start={d[:60]}")

find_main_paths('scratch/spa.svg')
find_main_paths('scratch/imola.svg')
find_main_paths('scratch/fuji_alt.svg')
find_main_paths('scratch/lemans.svg')
