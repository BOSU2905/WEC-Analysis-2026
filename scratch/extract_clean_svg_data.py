import xml.etree.ElementTree as ET

def clean_svg_data(filename, target_ids):
    tree = ET.parse(filename)
    root = tree.getroot()
    found = {}
    for el in root.iter():
        el_id = el.attrib.get('id')
        if el_id in target_ids:
            found[el_id] = el.attrib.get('d')
    return found

spa_paths = clean_svg_data('scratch/spa.svg', ['path2840', 'path5814', 'path5818', 'path5820'])
print("Spa paths found:", list(spa_paths.keys()))

imola_paths = clean_svg_data('scratch/imola.svg', ['path2582'])
print("Imola paths found:", list(imola_paths.keys()))

fuji_paths = clean_svg_data('scratch/fuji_alt.svg', ['path2609', 'path3974', 'path3982', 'path3978'])
print("Fuji paths found:", list(fuji_paths.keys()))
