import xml.etree.ElementTree as ET

# Let's inspect the exact path strings and sector paths
with open("scratch/lemans.svg") as f:
    lm_root = ET.fromstring(f.read())
lm_d = lm_root.findall('.//{http://www.w3.org/2000/svg}path')[0].attrib['d']

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

# For Spa, track and sectors are inside group with translate(2047.7528,-153.52072)
# In SVG: <svg viewBox="0 0 1416 876"><g transform="translate(2047.7528,-153.52072)">...</g></svg>
with open("scratch/test_spa_view.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1416 876" style="background:#111;">
    <g transform="translate(2047.7528,-153.52072)">
        <path d="{spa_track}" fill="none" stroke="#444" stroke-width="12" />
        <path d="{spa_s1}" fill="none" stroke="#f59e0b" stroke-width="8" />
        <path d="{spa_s2}" fill="none" stroke="#3b82f6" stroke-width="8" />
        <path d="{spa_s3}" fill="none" stroke="#10b981" stroke-width="8" />
    </g>
</svg>''')

# For Fuji, track has transforms: translate(-1288.2294,-918.78876) and translate(1330.146,674.76135) -> net: translate(41.9166,-244.02741)
# And sectors have translate(-1288.2294,-918.78876)
# Let's verify Fuji coordinate alignment!
with open("scratch/test_fuji_view.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 480" style="background:#111;">
    <g transform="translate(-1288.2294,-918.78876)">
        <g transform="translate(1330.146,674.76135)">
            <path d="{fuji_track}" fill="none" stroke="#444" stroke-width="12" />
        </g>
        <path d="{fuji_s1}" fill="none" stroke="#f59e0b" stroke-width="8" />
        <path d="{fuji_s2}" fill="none" stroke="#3b82f6" stroke-width="8" />
        <path d="{fuji_s3}" fill="none" stroke="#10b981" stroke-width="8" />
    </g>
</svg>''')

# For Imola: path has transforms translate(-407.16077,-399.05715) and translate(428.36066,391.76854) -> net: translate(21.19989, -7.28861)
with open("scratch/test_imola_view.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1338 727" style="background:#111;">
    <g transform="translate(-407.16077,-399.05715)">
        <g transform="translate(428.36066,391.76854)">
            <path d="{imola_track}" fill="none" stroke="#e8e7e3" stroke-width="10" />
        </g>
    </g>
</svg>''')

# For Le Mans:
with open("scratch/test_lemans_view.svg", "w") as f:
    f.write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338 753" style="background:#111;">
    <path d="{lm_d}" fill="none" stroke="#e8e7e3" stroke-width="8" />
</svg>''')

print("Generated test SVGs")
