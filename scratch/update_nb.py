import nbformat as nbf

with open('/home/ben/WEC-Analysis-2026/notebooks/wec_analytical_foundation.ipynb', 'r') as f:
    nb = nbf.read(f, as_version=4)

# Update cell containing Toyota findings and tyre findings
for cell in nb.cells:
    if 'Toyota Top-Class Class-Position Victories' in cell.source:
        cell.source = cell.source.replace('45', '44')
    if '10 — Formal Analytical Findings' in cell.source:
        cell.source = cell.source.replace('| Toyota Top-Class Dominance | Class-Position Wins | 45 |', '| Toyota Top-Class Dominance | Class-Position Wins | 44 |')
        cell.source = cell.source.replace('| Toyota Overall Dominance | Overall-Position Wins | 45 |', '| Toyota Overall Dominance | Overall-Position Wins | 44 |')
        cell.source = cell.source.replace('| Michelin Share | Tyre Assignments | 2079 | Car Entry Row | 3011 entries |', '| Michelin Share | Tyre Assignments | 2057 | Car Entry Row | 3011 entries |')
    if '07 — Tyre Analysis' in cell.source:
        cell.source = cell.source.replace('2079', '2057')

with open('/home/ben/WEC-Analysis-2026/notebooks/wec_analytical_foundation.ipynb', 'w') as f:
    nbf.write(nb, f)
