import xml.etree.ElementTree as ET

def get_track_paths(filename):
    print(f"\n==================== {filename} ====================")
    tree = ET.parse(filename)
    root = tree.getroot()
    # Find all path elements
    for el in root.iter():
        tag = el.tag.split('}')[-1]
        if tag == 'path':
            pid = el.attrib.get('id', '')
            d = el.attrib.get('d', '')
            stroke = el.attrib.get('stroke', '')
            style = el.attrib.get('style', '')
            fill = el.attrib.get('fill', '')
            if len(d) > 200:
                print(f"Path id={pid} stroke={stroke} len={len(d)} d_start={d[:50]}... style={style}")

get_track_paths('scratch/spa.svg')
get_track_paths('scratch/imola.svg')
get_track_paths('scratch/fuji.svg')
get_track_paths('scratch/fuji_alt.svg')
