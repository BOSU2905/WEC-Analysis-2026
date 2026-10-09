# 🔧 Debugging Streamlit Cloud Errors

## 🚨 Current Issue: "Error running app"

You're getting this error after reboot/redeploy. Let's fix it!

---

## ✅ **FIXES JUST APPLIED (Already Pushed!)**

### Fix 1: app.py - Data Loading
```python
# Now tries multiple paths:
- 'Data/raw/wec_data.csv'
- 'data/raw/wec_data.csv'  
- './Data/raw/wec_data.csv'
- Full absolute path
```

### Fix 2: Data Cleaning Logic
- Moved BEFORE return statement (was unreachable code!)
- Now properly processes data

### Fix 3: Error Handling
- Better error messages
- Graceful failure with st.error()

---

## 🧪 **TWO VERSIONS TO TRY:**

### Version 1: Full Dashboard (app.py)
```
Repository: BOSU2905/WEC-Analysis-2026
Branch: main
Main file: app.py
```

### Version 2: Simple Test (app_simple.py) ⭐ **TRY THIS FIRST**
```
Repository: BOSU2905/WEC-Analysis-2026
Branch: main  
Main file: app_simple.py
```

**Why try simple version first?**
- Minimal dependencies
- Better error messages
- Easier to debug
- Verifies data loading works

---

## 📋 **STEP-BY-STEP: Deploy Test Version**

### Step 1: Delete Current App
1. Go to https://share.streamlit.io
2. Find your app
3. Click "⋮" → "Delete app"
4. Confirm deletion

### Step 2: Deploy Simple Test Version
1. Click "New app"
2. Fill form:
   ```
   Repository: BOSU2905/WEC-Analysis-2026
   Branch: main
   Main file: app_simple.py  ← IMPORTANT!
   ```
3. Click "Deploy"
4. Wait 2-3 minutes

### Step 3: Check Results

**If SUCCESS (✅):**
- You'll see "✅ Data loaded: 3035 rows"
- Shows basic stats
- This means data loading works!
- Now try full app (app.py)

**If STILL ERROR (❌):**
- Click "Manage app" → "Logs"
- **Screenshot the error**
- Share with me for debugging

---

## 🔍 **How to Read Error Logs**

### Access Logs:
1. Go to your app page
2. Click "Manage app"
3. Click "Logs" tab
4. Scroll to bottom for latest errors

### Common Errors & Solutions:

#### Error 1: "FileNotFoundError: Data/raw/wec_data.csv"
```
❌ Problem: CSV file not found
✅ Solution: Already fixed in latest commit!
```

#### Error 2: "ModuleNotFoundError: No module named 'xxx'"
```
❌ Problem: Missing package in requirements.txt
✅ Check: requirements.txt has all packages
```

#### Error 3: "AttributeError: 'DataFrame' object has no attribute 'class_group'"
```
❌ Problem: Data cleaning didn't run
✅ Fixed: Moved cleaning before return
```

#### Error 4: "Memory exceeded"
```
❌ Problem: Too much data for free tier
✅ Solution: Use filters to reduce data
```

---

## 🎯 **QUICK CHECKLIST**

Before deploying, verify:

**In GitHub:**
- [x] requirements.txt updated (>=  not ==)
- [x] app.py has path error handling
- [x] Data/raw/wec_data.csv exists
- [x] .streamlit/config.toml exists
- [x] .python-version exists

**In Streamlit Cloud:**
- [ ] Correct repository selected
- [ ] Branch is "main"
- [ ] Main file is "app_simple.py" (for testing)
- [ ] No custom secrets needed
- [ ] Python 3.11 (auto-detected from .python-version)

---

## 🔄 **RECOMMENDED TESTING SEQUENCE**

### Test 1: Simplest Version ⭐
```
Main file: app_simple.py
Expected: ✅ "Data loaded: 3035 rows"
Time: 2-3 minutes
```
**If this works → Data loading is OK!**

### Test 2: Full Version
```
Main file: app.py
Expected: ✅ Full dashboard with charts
Time: 3-5 minutes
```
**If this works → Everything is OK!**

---

## 📸 **Screenshots to Share (If Still Error)**

Please share screenshots of:

1. **Streamlit Cloud Logs**
   - Full error traceback
   - Last 20-30 lines

2. **Deployment Settings**
   - Repository name
   - Branch name
   - Main file path

3. **App Status Page**
   - The "Error running app" screen

---

## 💡 **ALTERNATIVE: Local Preview First**

If cloud keeps failing, test locally:

```bash
# On your PC at home:
cd WEC-Analysis-2026
git pull origin main

# Test simple version
streamlit run app_simple.py

# If works, test full version  
streamlit run app.py
```

**If works locally but not on cloud:**
- Means issue is cloud-specific
- Likely path or environment issue
- Share logs for diagnosis

---

## 🆘 **EMERGENCY FIX: Manual File Check**

### On Streamlit Cloud, they should see:
```
/mount/src/wec-analysis-2026/
├── app.py
├── app_simple.py
├── Data/
│   └── raw/
│       └── wec_data.csv
├── requirements.txt
└── .streamlit/
    └── config.toml
```

**Verify this in logs:**
```python
import os
import streamlit as st

st.write("Current directory:", os.getcwd())
st.write("Files:", os.listdir('.'))
if os.path.exists('Data'):
    st.write("Data folder contents:", os.listdir('Data'))
    if os.path.exists('Data/raw'):
        st.write("Data/raw contents:", os.listdir('Data/raw'))
```

---

## 🎯 **WHAT TO DO NOW:**

### Option A: Try Simple Version (Recommended)
1. Delete current app
2. Deploy new with `app_simple.py`
3. See if data loads
4. Report results

### Option B: Share Error Logs
1. Click "Manage app" → "Logs"
2. Screenshot error messages
3. Share with me
4. I'll diagnose

### Option C: Wait for PC at Home
1. Test locally first
2. Verify everything works
3. Then troubleshoot cloud
4. Easier with full setup

---

## 📝 **Error Log Template**

When sharing error, please include:

```
=== STREAMLIT CLOUD ERROR ===

App Name: [your-app-name]
Repository: BOSU2905/WEC-Analysis-2026
Branch: main
Main File: app.py (or app_simple.py)

=== ERROR MESSAGE ===
[paste last 30 lines of logs here]

=== WHAT I TRIED ===
1. Rebooted app
2. Redeployed fresh
3. Tried simple version
4. Result: [still error / works / etc]
```

---

## ✅ **SUCCESS INDICATORS**

You'll know it works when you see:

### For app_simple.py:
```
✅ Data loaded: 3035 rows
Total Rows: 3035
Columns: car, overall_position, class_position, team, vehicle...
✅ App is running successfully!
```

### For app.py:
```
🏁 WEC Racing Analysis Dashboard 2026 🏁
[Stats Cards showing: 247, 157, 198, 3035]
[6 tabs: Team Wins, Car Performance, etc]
[Charts loading and interactive]
```

---

**Let's fix this! Share the error logs or try app_simple.py!** 🔧🚀
