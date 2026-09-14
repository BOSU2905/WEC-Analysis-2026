# ⚡ Quick Start - WEC Dashboard

## 🚀 Run in 30 Seconds

### Dash Version (FIA WEC Design) - RECOMMENDED
```bash
cd WEC-Analysis-2026
pip install -r requirements.txt
python app_dash.py
```
**Open**: http://localhost:8050

### Streamlit Version
```bash
cd WEC-Analysis-2026
pip install -r requirements.txt
streamlit run app.py
```
**Open**: http://localhost:8501

---

## 🎯 What Can I Do?

### 1. Filter Data
**Sidebar** → Select:
- 📅 Seasons (years)
- 🏎️ Classes (Hypercar, LMP2, LMGT3)
- 🏁 Races (tracks)

### 2. Explore 6 Analysis Tabs
1. **🏆 Team Wins** - Top teams by class
2. **🏎️ Car Performance** - Best vehicles
3. **🛞 Tyres** - Manufacturer analysis
4. **⏱️ Lap Times** - Speed trends
5. **📈 Speed** - Track comparisons
6. **🏁 Winners** - Historical data

### 3. Interact with Charts
- **Hover**: See details
- **Click Legend**: Show/hide data
- **Zoom**: Drag to zoom in
- **Export**: Save as PNG

---

## 🐛 Troubleshooting

**Port in use?**
```bash
# Dash
python app_dash.py --port 8051

# Streamlit
streamlit run app.py --server.port 8502
```

**Module not found?**
```bash
pip install --upgrade -r requirements.txt
```

**Data not loading?**
```bash
# Check file exists
ls Data/raw/wec_data.csv
```

---

## 📖 Need More Help?

- **Full Guide**: [README.md](README.md)
- **Features List**: [FEATURES.md](FEATURES.md)
- **Comparison**: [COMPARISON.md](COMPARISON.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**That's it! You're ready to race!** 🏁
