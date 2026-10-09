import json
import os

nb_path = 'analysis/notebooks/wec_analytical_foundation.ipynb'
with open(nb_path, 'r') as f:
    nb = json.load(f)

for cell in nb.get('cells', []):
    if cell['cell_type'] == 'code':
        new_source = []
        for line in cell['source']:
            line = line.replace('../Data/raw/wec_data.csv', '../../data/raw/wec_data.csv')
            line = line.replace('../Data/processed', '../../data/processed')
            new_source.append(line)
        cell['source'] = new_source

with open(nb_path, 'w') as f:
    json.dump(nb, f, indent=1)

def fix_file(path, old, new):
    if not os.path.exists(path): return
    with open(path, 'r') as f:
        content = f.read()
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)

fix_file('legacy/dash/app_dash.py', 'Data/raw/wec_data.csv', '../../data/raw/wec_data.csv')
fix_file('legacy/dash/preview_generator.py', 'Data/raw/wec_data.csv', '../../data/raw/wec_data.csv')
fix_file('legacy/streamlit/app_simple.py', 'Data/raw/wec_data.csv', '../../data/raw/wec_data.csv')
fix_file('legacy/streamlit/app.py', "'Data/raw/wec_data.csv'", "'../../data/raw/wec_data.csv'")
fix_file('legacy/streamlit/app.py', "'data/raw/wec_data.csv'", "'../../data/raw/wec_data.csv'")
fix_file('legacy/streamlit/app.py', "'./Data/raw/wec_data.csv'", "'../../data/raw/wec_data.csv'")
fix_file('README.md', 'Data/raw/wec_data.csv', 'data/raw/wec_data.csv')
fix_file('README.md', 'notebooks/', 'analysis/notebooks/')
