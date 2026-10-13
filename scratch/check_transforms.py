import xml.etree.ElementTree as ET

def check_group_transforms(filename, target_id):
    tree = ET.parse(filename)
    root = tree.getroot()
    # Walk tree and keep track of parent transforms
    def walk(el, transforms):
        cur_t = transforms[:]
        t = el.attrib.get('transform')
        if t:
            cur_t.append(t)
        if el.attrib.get('id') == target_id:
            print(f"Target '{target_id}' in {filename} has transforms: {cur_t}")
        for child in el:
            walk(child, cur_t)
    walk(root, [])

check_group_transforms('scratch/spa.svg', 'path2840')
check_group_transforms('scratch/spa.svg', 'path5814')
check_group_transforms('scratch/imola.svg', 'path2582')
check_group_transforms('scratch/fuji_alt.svg', 'path2609')
check_group_transforms('scratch/fuji_alt.svg', 'path3974')
