import xml.etree.ElementTree as ET
import re

# In Le Mans, the track path is:
with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']

# Let's inspect the commands in lm_d:
# It starts at M8.708,235.61 (Start/Finish)
# Goes past Tertre Rouge to 1st Chicane (~254.6, 273.6) -> Sector 1
# Goes past 2nd Chicane to Mulsanne corner & Indianapolis (~163.4, 662.5) -> Sector 2
# Goes past Arnage, Porsche Curves, Ford Chicane back to Start/Finish -> Sector 3

# For Imola:
with open("scratch/imola.svg") as f:
    im_root = ET.fromstring(f.read())
im_d = im_root.find('.//*[@id="path2582"]').attrib['d']

print("lm_d commands len:", len(lm_d))
print("im_d commands len:", len(im_d))
