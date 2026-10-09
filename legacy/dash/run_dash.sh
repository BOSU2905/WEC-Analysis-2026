#!/bin/bash

echo "🏁 Starting WEC Analysis Dashboard (Dash Version)..."
echo ""
echo "📦 Checking dependencies..."

# Check if dash is installed
if ! python -c "import dash" &> /dev/null; then
    echo "⚠️  Dash not found. Installing dependencies..."
    pip install -r requirements.txt
else
    echo "✅ Dependencies OK"
fi

echo ""
echo "🚀 Launching dashboard with FIA WEC inspired design..."
echo "📍 Dashboard will open at: http://localhost:8050"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app_dash.py
