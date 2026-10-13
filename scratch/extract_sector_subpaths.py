import xml.etree.ElementTree as ET
import re

def split_path_by_coordinates(d_str, split_points):
    # Splits SVG path into contiguous subpaths at points closest to split_points
    # First tokenize into commands
    commands = re.findall(r'([a-zA-Z][^a-zA-Z]*)', d_str)
    print(f"Total commands: {len(commands)}")
    return commands

with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lm_cmds = split_path_by_coordinates(lm_d, [])

with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']
im_cmds = split_path_by_coordinates(im_d, [])
