import json
import xml.etree.ElementTree as ET

# Read the verified SVGs
with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_track = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']

with open("scratch/spa.svg") as f:
    spa_root = ET.fromstring(f.read())
spa_track = spa_root.find('.//*[@id="path2840"]').attrib['d']
spa_s1 = spa_root.find('.//*[@id="path5814"]').attrib['d']
spa_s2 = spa_root.find('.//*[@id="path5818"]').attrib['d']
spa_s3 = spa_root.find('.//*[@id="path5820"]').attrib['d']

with open("scratch/imola.svg") as f:
    imola_root = ET.fromstring(f.read())
imola_track = imola_root.find('.//*[@id="path2582"]').attrib['d']

with open("scratch/fuji_alt.svg") as f:
    fuji_root = ET.fromstring(f.read())
fuji_track = fuji_root.find('.//*[@id="path2609"]').attrib['d']
fuji_s1 = fuji_root.find('.//*[@id="path3974"]').attrib['d']
fuji_s2 = fuji_root.find('.//*[@id="path3982"]').attrib['d']
fuji_s3 = fuji_root.find('.//*[@id="path3978"]').attrib['d']

print("Loaded all SVG paths successfully.")
