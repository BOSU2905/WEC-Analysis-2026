# 🚀 How to Run WEC Dashboard - Complete Guide

Ada **3 cara mudah** untuk melihat dashboard WEC Anda:

---

## ⚡ Option 1: Run di Local Computer (TERMUDAH!) ✨

### Step 1: Clone Repository
```bash
git clone https://github.com/BOSU2905/WEC-Analysis-2026.git
cd WEC-Analysis-2026
```

### Step 2: Install Dependencies
```bash
pip install pandas plotly dash streamlit numpy
```
**Atau** install semua sekaligus:
```bash
pip install -r requirements.txt
```

### Step 3: Run Dashboard

#### 🎨 **Dash Version (FIA WEC Design) - RECOMMENDED:**
```bash
python app_dash.py
```
✅ Buka browser: **http://localhost:8050**

**Screenshot:**
```
🏁 Starting WEC Dashboard...
Dash is running on http://127.0.0.1:8050/
```

#### 📊 **Streamlit Version:**
```bash
streamlit run app.py
```
✅ Buka browser: **http://localhost:8501**

**Screenshot:**
```
You can now view your Streamlit app in your browser.
Local URL: http://localhost:8501
```

---

## ☁️ Option 2: Deploy ke Streamlit Cloud (GRATIS & ONLINE!) 🌐

**Keuntungan:**
- ✅ GRATIS 100%
- ✅ Online 24/7
- ✅ Bisa diakses dari mana saja
- ✅ Share link ke siapa saja
- ✅ Auto-update dari GitHub

### Langkah-langkah:

1. **Buka Streamlit Cloud:**
   ```
   https://share.streamlit.io
   ```

2. **Login dengan GitHub**

3. **Create New App:**
   - Click tombol **"New app"**

4. **Isi Form:**
   ```
   Repository: BOSU2905/WEC-Analysis-2026
   Branch: main
   Main file path: app.py
   ```

5. **Click "Deploy"**

6. **Tunggu 2-3 menit** ⏳

7. **DONE!** Dashboard Anda LIVE! 🎉
   ```
   Your app URL: https://your-app-name.streamlit.app
   ```

**Screenshot Hasil:**
```
🎉 Your app is now deployed!
🌐 https://wec-analysis-2026.streamlit.app
```

---

## 📄 Option 3: Generate Static HTML Preview (Tanpa Install!) 🖼️

Jika Anda **hanya ingin preview cepat** tanpa install dependencies:

### Step 1: Generate HTML
```bash
cd WEC-Analysis-2026
python3 preview_generator.py
```

### Step 2: Buka File
```bash
# Open di browser
open wec_dashboard_preview.html

# Atau double-click file di file explorer
```

**File ini berisi:**
- ✅ 5 visualisasi utama
- ✅ Statistics cards
- ✅ FIA WEC design
- ✅ Bisa dibuka offline
- ❌ Tidak ada filtering (static)
- ❌ Tidak interactive

---

## 🐳 Bonus: Docker Deployment

Jika Anda familiar dengan Docker:

### Build Image:
```bash
docker build -t wec-dashboard .
```

### Run Container:
```bash
docker run -p 8050:8050 wec-dashboard
```

### Open Browser:
```
http://localhost:8050
```

---

## 🔧 Troubleshooting

### Problem 1: Port Already in Use
```bash
# Dash - ganti port
python app_dash.py --port 8051

# Streamlit - ganti port
streamlit run app.py --server.port 8502
```

### Problem 2: Module Not Found
```bash
# Install ulang
pip install --upgrade pandas plotly dash streamlit numpy
```

### Problem 3: Permission Denied
```bash
# Linux/Mac - tambah execute permission
chmod +x run_dash.sh
./run_dash.sh
```

### Problem 4: Python Version
```bash
# Check versi (minimum 3.8)
python --version

# Gunakan python3 jika perlu
python3 app_dash.py
```

---

## 📊 Apa Yang Akan Anda Lihat?

### 1. **Header**
```
🏁 WEC RACING ANALYSIS 🏁
Season Analysis Dashboard 2026
```

### 2. **Statistics Cards**
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  TOTAL   │ │  TOTAL   │ │  TOTAL   │ │  TOTAL   │
│  RACES   │ │  TEAMS   │ │   CARS   │ │ ENTRIES  │
│    247   │ │    157   │ │    198   │ │   3,035  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### 3. **Sidebar Filters**
- 📅 Season selector
- 🏎️ Class filter (Hypercar, LMP2, LMGT3)
- 🏁 Race track filter

### 4. **6 Analysis Tabs**
- 🏆 **Team Wins**: Top teams by class
- 🏎️ **Car Performance**: Best vehicles
- 🛞 **Tyres**: Manufacturer analysis
- ⏱️ **Lap Times**: Speed trends
- 📈 **Speed**: Track comparisons
- 🏁 **Winners**: Historical data

---

## 🎯 Quick Commands Summary

### Paling Cepat (Local):
```bash
cd WEC-Analysis-2026
pip install -r requirements.txt
python app_dash.py
# Open: http://localhost:8050
```

### Paling Mudah (Cloud):
```
1. Go to: https://share.streamlit.io
2. Login with GitHub
3. Deploy: BOSU2905/WEC-Analysis-2026
4. Done! ✨
```

### Paling Simple (Preview):
```bash
python3 preview_generator.py
open wec_dashboard_preview.html
```

---

## 💡 Rekomendasi

### Untuk Development/Testing:
✅ **Run Local** (Option 1)

### Untuk Production/Sharing:
✅ **Streamlit Cloud** (Option 2)

### Untuk Quick Look:
✅ **Static HTML** (Option 3)

---

## 📞 Need Help?

**Errors?**
- Check [QUICK_START.md](QUICK_START.md) troubleshooting
- Review [DEPLOYMENT.md](DEPLOYMENT.md)
- Check Python version (min 3.8)
- Verify dependencies installed

**Questions?**
- Read [README.md](README.md)
- Check [FEATURES.md](FEATURES.md)
- Review code comments

---

## 🎉 Success Indicators

Anda **berhasil** jika melihat:

### Dash Version:
```
✅ Dash is running on http://127.0.0.1:8050/
✅ Browser terbuka otomatis
✅ Dashboard dengan design hitam-merah-gold
✅ Charts interaktif bisa di-hover
```

### Streamlit Version:
```
✅ You can now view your Streamlit app
✅ Local URL: http://localhost:8501
✅ Charts muncul dengan benar
✅ Filters di sidebar berfungsi
```

### Streamlit Cloud:
```
✅ Your app is now deployed!
✅ URL: https://xxx.streamlit.app
✅ Bisa dibuka dari device mana saja
✅ Bisa share link ke orang lain
```

---

**Happy Racing! 🏎️💨**

Selamat menjelajahi data WEC dengan dashboard yang keren! 🏁
