import json

with open('analysis/notebooks/wec_analytical_foundation.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Total cells: {len(nb['cells'])}")
for i, cell in enumerate(nb['cells']):
    src = "".join(cell.get('source', []))
    lines = [l.strip() for l in src.split('\n') if l.strip()]
    header = lines[0] if lines else "Empty"
    if any(k in src.lower() for k in ['team', 'champion', 'winner', 'hypercar', 'gte', 'season', 'manufacturer']):
        print(f"Cell {i} [{cell['cell_type']}]: {header[:100]}")
