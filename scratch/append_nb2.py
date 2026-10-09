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
        "# --- Phase 3B: Chapter 02 Frontend Exports ---\n",
        "import json\n",
        "# Top-class overall wins per manufacturer per season\n",
        "top_class_wins = df[df['class_group'] == 'Top Class (LMP1/Hypercar)'].copy()\n",
        "top_class_wins['is_win'] = top_class_wins['class_position'] == 1\n",
        "wins_df = top_class_wins[top_class_wins['is_win']]\n",
        "\n",
        "# Group by season and manufacturer\n",
        "manufacturer_wins = wins_df.groupby(['season', 'vehicle']).size().reset_index(name='wins')\n",
        "\n",
        "# Resolve vehicle name to primary manufacturer for this chart\n",
        "def map_mfg(v):\n",
        "    if 'Toyota' in v: return 'Toyota'\n",
        "    if 'Audi' in v: return 'Audi'\n",
        "    if 'Porsche' in v: return 'Porsche'\n",
        "    if 'Ferrari' in v: return 'Ferrari'\n",
        "    if 'Peugeot' in v: return 'Peugeot'\n",
        "    if 'Alpine' in v: return 'Alpine'\n",
        "    return 'Other'\n",
        "manufacturer_wins['manufacturer'] = manufacturer_wins['vehicle'].apply(map_mfg)\n",
        "mfg_season_wins = manufacturer_wins.groupby(['season', 'manufacturer'])['wins'].sum().reset_index()\n",
        "\n",
        "# Export for D3\n",
        "mfg_season_wins.to_csv('../../web/src/data/mfg_season_wins.csv', index=False)\n",
        "\n",
        "toyota_total = mfg_season_wins[mfg_season_wins['manufacturer'] == 'Toyota']['wins'].sum()\n",
        "print(f\"Toyota Total Top Class Wins exported: {toyota_total}\")\n"
    ]
}

nb['cells'].append(new_cell)

with open(nb_path, 'w') as f:
    json.dump(nb, f, indent=1)
