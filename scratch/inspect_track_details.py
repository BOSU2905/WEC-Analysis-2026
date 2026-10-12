import xml.etree.ElementTree as ET
import re

def analyze_svg(filename):
    print(f"\n==================== {filename} ====================")
    tree = ET.parse(filename)
    root = tree.getroot()
    # Find all elements with id, or text elements
    for el in root.iter():
        tag = el.tag.split('}')[-1]
        el_id = el.attrib.get('id', '')
        if tag == 'text':
            text = "".join(el.itertext()).strip()
            print(f"TEXT [id={el_id}]: '{text}' at x={el.attrib.get('x')} y={el.attrib.get('y')}")
        elif tag == 'path':
            stroke_w = el.attrib.get('stroke-width', '')
            style = el.attrib.get('style', '')
            d = el.attrib.get('d', '')
            # Look for thick paths (likely track outline)
            if len(d) > 300:
                print(f"TRACK PATH candidate: id='{el_id}' len={len(d)} stroke_w={stroke_w} style={style[:60]}")

for f in ['scratch/lemans.svg', 'scratch/spa.svg', 'scratch/imola.svg', 'scratch/fuji.svg', 'scratch/fuji_alt.svg']:
    analyze_svg(f)
