import xml.etree.ElementTree as ET

def print_texts_and_positions(filename):
    print(f"\n==================== {filename} ====================")
    tree = ET.parse(filename)
    root = tree.getroot()
    for el in root.iter():
        tag = el.tag.split('}')[-1]
        if tag == 'text':
            t = "".join(el.itertext()).strip()
            x = el.attrib.get('x', '')
            y = el.attrib.get('y', '')
            transform = el.attrib.get('transform', '')
            print(f"'{t}': x={x}, y={y}, transform={transform}")

print_texts_and_positions("scratch/spa.svg")
print_texts_and_positions("scratch/imola.svg")
print_texts_and_positions("scratch/fuji_alt.svg")
