import json

with open('/home/ben/WEC-Analysis-2026/notebooks/analysis.ipynb', 'r') as f:
    nb = json.load(f)

for i, cell in enumerate(nb.get('cells', [])):
    if cell['cell_type'] == 'code':
        source = "".join(cell.get('source', []))
        print(f"\n--- CELL {i} ---")
        print(source)
