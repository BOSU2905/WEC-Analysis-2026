import xml.etree.ElementTree as ET
import re

# Let's inspect the bounding box of coordinates in each path string
def get_path_bbox(d):
    # Extract all numbers from d
    # Match patterns of float numbers
    nums = [float(x) for x in re.findall(r'[-+]?(?:\d*\.\d+|\d+)', d)]
    # Pair them as x, y (note: rough approximation for bounds, better to use svg path parser if available, or min/max)
    # Let's see if we can do more precise extraction
    return min(nums), max(nums), len(nums)

with open("scratch/lemans.svg", "r") as f:
    lemans_root = ET.fromstring(f.read())
lemans_path = lemans_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']

with open("scratch/spa.svg", "r") as f:
    spa_root = ET.fromstring(f.read())
spa_track = spa_root.find('.//*[@id="path2840"]').attrib['d']
spa_s1 = spa_root.find('.//*[@id="path5814"]').attrib['d']
spa_s2 = spa_root.find('.//*[@id="path5818"]').attrib['d']
spa_s3 = spa_root.find('.//*[@id="path5820"]').attrib['d']

with open("scratch/imola.svg", "r") as f:
    imola_root = ET.fromstring(f.read())
imola_track = imola_root.find('.//*[@id="path2582"]').attrib['d']

with open("scratch/fuji_alt.svg", "r") as f:
    fuji_root = ET.fromstring(f.read())
fuji_track = fuji_root.find('.//*[@id="path2609"]').attrib['d']
fuji_s1 = fuji_root.find('.//*[@id="path3974"]').attrib['d']
fuji_s2 = fuji_root.find('.//*[@id="path3982"]').attrib['d']
fuji_s3 = fuji_root.find('.//*[@id="path3978"]').attrib['d']

print("Le Mans track d length:", len(lemans_path))
print("Spa track d length:", len(spa_track))
print("Spa s1 length:", len(spa_s1), "s2 length:", len(spa_s2), "s3 length:", len(spa_s3))
print("Imola track d length:", len(imola_track))
print("Fuji track d length:", len(fuji_track))
print("Fuji s1 length:", len(fuji_s1), "s2 length:", len(fuji_s2), "s3 length:", len(fuji_s3))
