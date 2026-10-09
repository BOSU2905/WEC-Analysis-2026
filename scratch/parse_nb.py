import json

with open('/home/ben/WEC-Analysis-2026/notebooks/analysis.ipynb', 'r') as f:
    nb = json.load(f)

for cell in nb.get('cells', []):
    if cell['cell_type'] == 'markdown':
        content = "".join(cell.get('source', [])).strip()
        if content.startswith('#'):
            print(f"MARKDOWN: {content.split(chr(10))[0]}")
    elif cell['cell_type'] == 'code':
        source = "".join(cell.get('source', [])).strip()
        lines = source.split('\n')
        # Print a short summary of the code cell
        if lines:
            print(f"CODE ({len(lines)} lines): {lines[0][:80]}")
