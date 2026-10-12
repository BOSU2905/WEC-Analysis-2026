import re

with open("scratch/lemans.svg", "r") as f:
    text = f.read()

# Look for path points
coords = re.findall(r'([MLCmlc])\s*([-\d.]+)[,\s]+([-\d.]+)', text)
print(f"Total commands with direct coords: {len(coords)}")
# Let's inspect some landmark points on Le Mans:
# Dunlop Chicane, Tertre Rouge, Mulsanne 1, Mulsanne 2, Mulsanne Corner, Indianapolis, Arnage, Porsche Curves, Ford Chicane
