import json

nb_path = 'analysis/notebooks/wec_analytical_foundation.ipynb'
with open(nb_path, 'r') as f:
    nb = json.load(f)

new_cell = {
    "cell_type": "code",
    "execution_count": None,
    "metadata": {},
    "outputs": [],
    "source": [
        "# --- Phase 3A: Frontend Exports ---\n",
        "import json\n",
        "dataset_scale = {\n",
        "    'total_events': int(df['event_id'].nunique()),\n",
        "    'total_entries': int(len(df)),\n",
        "    'classes': df['class_group'].value_counts().to_dict()\n",
        "}\n",
        "import os\n",
        "os.makedirs('../../web/src/data', exist_ok=True)\n",
        "with open('../../web/src/data/dataset_scale.json', 'w') as f:\n",
        "    json.dump(dataset_scale, f, indent=2)\n",
        "\n",
        "# Export entry data for dot visualization\n",
        "entry_dots = df[['season', 'event_id', 'class_group', 'team']].copy()\n",
        "entry_dots.to_csv('../../web/src/data/entry_dots.csv', index=False)\n"
    ]
}

nb['cells'].append(new_cell)

with open(nb_path, 'w') as f:
    json.dump(nb, f, indent=1)
