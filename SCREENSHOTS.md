# 📸 WEC Dashboard Screenshots & Visuals

> **Note**: Screenshots akan tersedia setelah aplikasi dijalankan. Berikut adalah template untuk dokumentasi visual.

---

## 🏠 Homepage / Dashboard Overview

### Dash Version (FIA WEC Design)
```
┌─────────────────────────────────────────────────────────────┐
│  [WEC LOGO] WEC RACING ANALYSIS                            │
│             Season Analysis Dashboard 2026                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  TOTAL   │ │  TOTAL   │ │  TOTAL   │ │  TOTAL   │     │
│  │  RACES   │ │  TEAMS   │ │   CARS   │ │ ENTRIES  │     │
│  │    247   │ │    157   │ │    198   │ │   3,035  │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                             │
│  [🏆 TEAM WINS | 🏎️ CAR PERFORMANCE | 🛞 TYRES | ... ]  │
│                                                             │
│  [INTERACTIVE CHARTS & VISUALIZATIONS]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Color Scheme**:
- Background: Deep Black (#0A0A0A)
- Primary: WEC Red (#E10600)
- Accent: Championship Gold (#FFD700)
- Text: White (#FFFFFF)

---

## 🎛️ Sidebar Filters

```
┌──────────────────────┐
│  ⚙️ FILTERS          │
├──────────────────────┤
│                      │
│  SEASON              │
│  ┌────────────────┐  │
│  │ 2013, 2014,   │  │
│  │ 2015, 2016... │  │
│  └────────────────┘  │
│                      │
│  CLASS               │
│  ┌────────────────┐  │
│  │ Hypercar      │  │
│  │ LMP2          │  │
│  │ LMGT3         │  │
│  └────────────────┘  │
│                      │
│  RACE TRACK          │
│  ┌────────────────┐  │
│  │ Le Mans       │  │
│  │ Silverstone   │  │
│  │ Spa...        │  │
│  └────────────────┘  │
│                      │
│  [RESET FILTERS]     │
│                      │
└──────────────────────┘
```

---

## 📊 Tab 1: Team Wins

### Hypercar Teams Bar Chart
```
WEC RACING - TOP 10 HYPERCAR TEAMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Toyota Racing        ████████████████████ 45
Porsche Team         ████████████████ 35
Ferrari AF Corse     ████████████ 25
Audi Sport           ██████████ 20
...
```

### LMGT3 Teams Bar Chart
```
WEC RACING - TOP 10 LMGT3 TEAMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AF Corse             ████████████████████ 52
Proton Racing        ████████████████ 38
...
```

### Victory Distribution
```
       Hypercar
         32%
    ╱────────────╲
   │              │
   │   LMGT3      │ LMP2
   │    48%       │ 20%
    ╲────────────╱
```

---

## 🏎️ Tab 2: Car Performance

### Top Winning Vehicles
```
TOP 15 WINNING VEHICLES BY CLASS

Toyota TS 040 - Hybrid        ████████████ (Hypercar)
Porsche 919 Hybrid           ███████████ (Hypercar)
Ferrari 488 GTE              ██████████ (LMGT3)
Audi R18 e-tron quattro     █████████ (Hypercar)
Morgan - Nissan             ████████ (LMP2)
...
```

---

## 🛞 Tab 3: Tyres Analysis

### Manufacturer Distribution
```
TYRES MANUFACTURERS USAGE

    Michelin      ●●●●●●●●●●●●●●●● 62%
    Dunlop        ●●●●●●●● 32%
    Others        ●●● 6%
```

---

## ⏱️ Tab 4: Lap Times

### Average Speed by Class
```
AVERAGE FASTEST LAP SPEED (km/h)

Hypercar  ██████████████████ 215.3
LMP2      █████████████ 198.7
LMGT3     ████████ 175.4
```

### Speed Evolution Trend
```
Speed (km/h)
│
220 ┤     ╱────╲
210 ┤  ╱─╯      ╲──
200 ┤ ╱            ╲
190 ┤╯              ╲
180 ┤                ╲
    └─────────────────────
    2013  2015  2017  2019
         Season →
```

---

## 📈 Tab 5: Speed Analysis

### Box Plot by Track
```
Speed Distribution by Race Track

Le Mans       ├──[██]──┤
Silverstone   ├─[███]──┤
Spa           ├──[██]───┤
Bahrain       ├───[█]───┤
              └─┬──┬──┬─┘
              180 200 220
              Speed (km/h)
```

---

## 🏁 Tab 6: Race Winners

### Heatmap
```
WINNERS COUNT BY TRACK AND SEASON

Track        2013 2014 2015 2016 2017
─────────────────────────────────────
Le Mans      ■■■  ■■   ■■■  ■    ■■
Silverstone  ■■   ■■■  ■■   ■■   ■
Spa          ■    ■■   ■■■  ■■   ■■■
Bahrain      ■■   ■    ■    ■■   ■■

■ = 1 winner   ■■ = 2 winners   ■■■ = 3 winners
```

---

## 🎨 Design Elements

### Typography Examples

**Header (Orbitron Bold):**
```
WEC RACING ANALYSIS
```

**Subheader (Rajdhani):**
```
Season Analysis Dashboard 2026
```

**Numbers (Orbitron with Glow):**
```
   247
```

### Color Gradients

**Primary Gradient:**
```
Red → Gold
#E10600 ────────→ #FFD700
```

**Background Gradient:**
```
Deep Black → Dark Gray
#0A0A0A ────────→ #1A1A1A
```

---

## 📱 Responsive Views

### Desktop (1920x1080)
```
┌────────────────────────────────────────────┐
│ [SIDEBAR]  [MAIN CONTENT - FULL WIDTH]    │
│            [CHARTS IN GRID]                │
└────────────────────────────────────────────┘
```

### Tablet (768x1024)
```
┌───────────────────────┐
│ [FILTERS COLLAPSED]   │
│                       │
│ [CONTENT STACKED]     │
│ [CHARTS FULL WIDTH]   │
└───────────────────────┘
```

### Mobile (375x667)
```
┌─────────────────┐
│ [≡] MENU        │
│                 │
│ [STATS CARDS]   │
│ [TABS]          │
│ [CHART 1]       │
│ [CHART 2]       │
└─────────────────┘
```

---

## 🎭 Interactive States

### Hover Effect
```
BEFORE HOVER:          AFTER HOVER:
┌──────────┐          ┌══════════┐
│  CHART   │    →     ║  CHART   ║ (Glow effect)
└──────────┘          └══════════┘
```

### Filter Active
```
INACTIVE:              ACTIVE:
[ ] Hypercar     →     [✓] Hypercar (Red highlight)
```

### Button States
```
NORMAL        HOVER         ACTIVE
┌─────────┐   ┌─────────┐   ┌─────────┐
│ RESET   │ → │░RESET░  │ → │▓RESET▓  │
└─────────┘   └─────────┘   └─────────┘
```

---

## 📊 Chart Types Used

### Bar Charts
- Horizontal bars untuk teams/cars
- Color-coded by class
- Values displayed on bars

### Line Charts
- Multi-line untuk trends
- Markers at data points
- Legend untuk classes

### Pie Charts
- Donut style (hole=0.4)
- Percentage labels
- Color-coded segments

### Box Plots
- Distribution visualization
- Outliers shown
- Quartile ranges

### Heatmaps
- 2D data representation
- Color intensity scale
- Value annotations

---

## 🎬 Interaction Flow

```
User Opens Dashboard
        ↓
Sees Statistics Cards
        ↓
Applies Filters ────→ Data Updates
        ↓                    ↓
Selects Tab ←────────────────┘
        ↓
Interacts with Charts
        ↓
Exports/Shares Results
```

---

## 💡 Usage Tips for Screenshots

### For Documentation
1. Capture full dashboard view
2. Show filter interactions
3. Highlight key insights
4. Demonstrate responsiveness

### For Presentations
1. Focus on key charts
2. Show before/after filters
3. Highlight winning teams
4. Display trend analysis

### For Social Media
1. Use attractive visualizations
2. Show WEC branding
3. Highlight interesting stats
4. Include racing emojis 🏎️🏁

---

## 🎯 What to Capture

### Essential Screenshots
- [ ] Full dashboard homepage
- [ ] Each of 6 analysis tabs
- [ ] Sidebar with filters
- [ ] Statistics cards
- [ ] Sample charts (each type)
- [ ] Mobile responsive view
- [ ] Dark theme showcase
- [ ] Interactive tooltips
- [ ] Export functionality
- [ ] Footer branding

### Optional Screenshots
- [ ] Loading states
- [ ] Error handling
- [ ] Empty states
- [ ] Zoom interactions
- [ ] Legend interactions
- [ ] Custom filters applied
- [ ] Comparison views
- [ ] Time-series animations

---

## 📝 Screenshot Checklist

Before taking screenshots:
- ✅ Run application locally
- ✅ Load sample data
- ✅ Apply meaningful filters
- ✅ Choose representative views
- ✅ Ensure good resolution
- ✅ Check colors display correctly
- ✅ Verify all elements visible
- ✅ Test on different browsers

---

**To generate actual screenshots:**

1. Run the application:
   ```bash
   python app_dash.py
   ```

2. Open in browser:
   ```
   http://localhost:8050
   ```

3. Navigate through tabs and capture screens

4. Save to `screenshots/` directory

5. Update this document with actual images

---

**Built for visual impact** 📸🏎️
