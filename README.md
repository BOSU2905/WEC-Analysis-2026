# 🏁 WEC Racing Analysis Dashboard 2026

Interactive web interface untuk visualisasi dan analisis data **World Endurance Championship (WEC)** racing.

## 🎨 Design Inspiration

Dashboard ini terinspirasi dari **[FIA WEC Official Website](https://www.fiawec.com)** dengan:
- **Racing-themed color scheme**: Red (#E10600), Gold (#FFD700), Black background
- **Modern typography**: Orbitron & Rajdhani fonts untuk racing aesthetic
- **Professional layout**: Clean, modern, dan responsive
- **Bold visual elements**: Gradient effects, shadows, dan racing-inspired UI

## 📱 Available Versions

Proyek ini menyediakan **2 versi web interface**:

### 1. **Streamlit Version** (`app.py`)
- ✅ Cepat dan mudah digunakan
- ✅ Out-of-the-box components
- ✅ Ideal untuk prototyping
- 📍 Default port: **8501**

### 2. **Dash Version** (`app_dash.py`) - **RECOMMENDED**
- ✅ **FIA WEC inspired design**
- ✅ Highly customizable
- ✅ Professional racing aesthetic
- ✅ Advanced styling dengan custom CSS
- ✅ Better performance untuk production
- 📍 Default port: **8050**

## 📋 Features

Dashboard ini mencakup semua analisis yang ada di notebook dengan visualisasi interaktif:

### 🏆 Team Performance
- **Hypercar Teams** dengan most wins
- **LMGT3 Teams** dengan most wins
- Victory distribution by class

### 🏎️ Car Performance
- Top winning vehicles by class
- Dominant cars per season and class
- Vehicle performance trends

### 🛞 Tyres Analysis
- Tyres manufacturers usage statistics
- Distribution by class
- Most used tyres brands

### ⏱️ Lap Time Analysis
- Average fastest lap speed by class
- Best lap times per class per season
- Speed evolution over years

### 📈 Speed Analysis
- Average speed (km/h) per year per class
- Speed distribution by race track
- Fastest cars per track and season

### 🏁 Race Winners
- Winners per track dengan lap times
- Interactive race winner tables
- Heatmap visualization

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 atau lebih baru
- pip (Python package manager)

### Step-by-Step Installation

1. **Clone repository** (jika belum):
```bash
git clone https://github.com/BOSU2905/WEC-Analysis-2026.git
cd WEC-Analysis-2026
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run Dashboard** (pilih salah satu):

#### Option A: Dash Version (Recommended - FIA WEC Design)
```bash
# Linux/Mac
./run_dash.sh

# Windows
python app_dash.py
```
**Buka browser**: http://localhost:8050

#### Option B: Streamlit Version
```bash
# Linux/Mac
./run.sh

# Windows  
streamlit run app.py
```
**Buka browser**: http://localhost:8501

## 📊 Dashboard Features

### Interactive Filters (Sidebar)
- **Season Filter**: Pilih season/tahun tertentu
- **Class Filter**: Filter by racing class (Hypercar, LMP2, LMGT3)
- **Race Filter**: Filter by race track

### 6 Analysis Tabs
1. **Team Wins**: Team performance analysis
2. **Car Performance**: Vehicle analysis and dominant cars
3. **Tyres Analysis**: Tyres manufacturer statistics
4. **Lap Times**: Speed and lap time analysis
5. **Speed Analysis**: Detailed speed comparisons
6. **Race Winners**: Winner tables and heatmaps

## 📁 Project Structure

```
WEC-Analysis-2026/
├── Data/
│   └── raw/
│       └── wec_data.csv         # Dataset WEC
├── notebooks/
│   └── analysis.ipynb           # Jupyter notebook analisis
├── app.py                       # Streamlit web app
├── app_dash.py                  # Dash web app (FIA WEC design)
├── run.sh                       # Run script Streamlit
├── run_dash.sh                  # Run script Dash
├── requirements.txt             # Python dependencies
├── README.md                    # Documentation
└── wec_analysis.txt            # Analysis requirements
```

## 🎨 Technologies Used

### Dash Version (Recommended)
- **Dash by Plotly**: Production-ready web framework
- **Plotly**: Interactive visualizations
- **Pandas**: Data manipulation
- **Custom CSS**: FIA WEC inspired design
- **Google Fonts**: Orbitron & Rajdhani

### Streamlit Version
- **Streamlit**: Rapid prototyping framework
- **Plotly**: Interactive charts
- **Pandas**: Data processing

## 📝 Data Analysis Coverage

Semua analisis dari `wec_analysis.txt` sudah diimplementasikan:

✅ Who hypercar's team has the most wins  
✅ Who LMGT3 team has the most wins  
✅ Tyres manufacturers that cars use the most  
✅ Percentage of mean lap times (hue with each class)  
✅ Perbedaan rata-rata kecepatan KPJ tiap tahunnya tiap kelas  
✅ Best lap time each class di tiap tahunnya  
✅ What car that dominates each year and each class  
✅ Winners each track and their laptime setiap tahun  
✅ Fastest car in the race each track and each year  

## 🎯 Usage Tips

1. **Gunakan Sidebar Filters** untuk fokus pada data tertentu
2. **Hover pada charts** untuk melihat detail data
3. **Click legend items** untuk hide/show data series
4. **Zoom in/out** pada charts dengan mouse drag
5. **Export charts** dengan camera icon di toolbar

## 🔧 Customization

Untuk memodifikasi dashboard:

1. Edit `app.py` untuk menambah/ubah visualizations
2. Modify colors di `color_discrete_map` dan `color_continuous_scale`
3. Add new analysis tabs di bagian `st.tabs()`

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
streamlit run app.py --server.port 8502
```

### Module not found
```bash
pip install -r requirements.txt --upgrade
```

### Data tidak muncul
Pastikan file `Data/raw/wec_data.csv` ada dan formatnya sesuai.

## 📫 Contact

Untuk pertanyaan atau feedback, silakan buat issue di GitHub repository.

## 📄 License

This project is for educational and analysis purposes.

## 📚 Documentation

Dokumentasi lengkap tersedia dalam file-file berikut:

- **[README.md](README.md)** - Quick start guide (you are here)
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview & achievements
- **[FEATURES.md](FEATURES.md)** - Detailed features & capabilities
- **[COMPARISON.md](COMPARISON.md)** - Streamlit vs Dash comparison
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guides

---

**Built with ❤️ using Streamlit and Plotly**
