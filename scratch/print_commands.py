import xml.etree.ElementTree as ET
import re

with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']
cmds = re.findall(r'([a-zA-Z][^a-zA-Z]*)', im_d)
for i, c in enumerate(cmds):
    print(f"im_cmd[{i}] {c[0]} len={len(c)}: {c[:80]}...")

with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']
lm_cmds = re.findall(r'([a-zA-Z][^a-zA-Z]*)', lm_d)
for i, c in enumerate(lm_cmds):
    print(f"lm_cmd[{i}] {c[0]} len={len(c)}: {c[:80]}...")
