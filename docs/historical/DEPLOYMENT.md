# 🚀 Deployment Guide - WEC Analysis Dashboard

Panduan lengkap untuk deploy WEC Analysis Dashboard ke berbagai platform.

---

## 📋 Table of Contents
1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Heroku Deployment](#heroku-deployment)
4. [AWS Deployment](#aws-deployment)
5. [Streamlit Cloud](#streamlit-cloud)
6. [Production Checklist](#production-checklist)

---

## 🏠 Local Development

### Requirements
- Python 3.8+
- pip
- Git

### Quick Start
```bash
# Clone repository
git clone https://github.com/BOSU2905/WEC-Analysis-2026.git
cd WEC-Analysis-2026

# Install dependencies
pip install -r requirements.txt

# Run Dash version (Recommended)
python app_dash.py

# OR Run Streamlit version
streamlit run app.py
```

### Troubleshooting Local Setup

**Issue: Port already in use**
```bash
# Dash - Change port
python app_dash.py --port 8051

# Streamlit - Change port
streamlit run app.py --server.port 8502
```

**Issue: Module not found**
```bash
# Reinstall all dependencies
pip install --upgrade -r requirements.txt
```

**Issue: Data not loading**
```bash
# Check if CSV exists
ls Data/raw/wec_data.csv

# Verify data integrity
python -c "import pandas as pd; print(pd.read_csv('Data/raw/wec_data.csv').shape)"
```

---

## 🐳 Docker Deployment

### Dockerfile (Dash Version)

Create `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8050

# Run app
CMD ["python", "app_dash.py"]
```

### Docker Commands

```bash
# Build image
docker build -t wec-dashboard .

# Run container
docker run -p 8050:8050 wec-dashboard

# Run with volume (for data updates)
docker run -p 8050:8050 -v $(pwd)/Data:/app/Data wec-dashboard

# Run in background
docker run -d -p 8050:8050 --name wec-app wec-dashboard

# View logs
docker logs wec-app

# Stop container
docker stop wec-app

# Remove container
docker rm wec-app
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  wec-dashboard:
    build: .
    ports:
      - "8050:8050"
    volumes:
      - ./Data:/app/Data
    environment:
      - PYTHONUNBUFFERED=1
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## 🟣 Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Setup Files

**1. Create `Procfile`:**
```
web: python app_dash.py
```

**2. Create `runtime.txt`:**
```
python-3.10.13
```

**3. Update `app_dash.py` for Heroku:**

Add before `if __name__ == '__main__':`:
```python
import os
PORT = int(os.environ.get('PORT', 8050))
```

Change last line to:
```python
app.run_server(debug=False, host='0.0.0.0', port=PORT)
```

### Deployment Commands

```bash
# Login to Heroku
heroku login

# Create app
heroku create wec-dashboard-2026

# Add buildpack
heroku buildpacks:set heroku/python

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open app
heroku open

# View logs
heroku logs --tail

# Scale dyno
heroku ps:scale web=1
```

### Heroku Config

```bash
# Set environment variables
heroku config:set PYTHON_VERSION=3.10.13

# Check status
heroku ps

# Restart app
heroku restart
```

---

## ☁️ AWS Deployment

### Using AWS Elastic Beanstalk

**1. Install EB CLI:**
```bash
pip install awsebcli
```

**2. Initialize EB:**
```bash
eb init -p python-3.10 wec-dashboard

# Select region
# Create new application
```

**3. Create environment:**
```bash
eb create wec-dashboard-env
```

**4. Deploy:**
```bash
eb deploy
```

**5. Open app:**
```bash
eb open
```

### Using AWS EC2

**1. Launch EC2 Instance:**
- AMI: Ubuntu 22.04 LTS
- Instance Type: t2.small or larger
- Security Group: Allow port 8050

**2. SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**3. Setup environment:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3-pip python3-venv -y

# Clone repository
git clone https://github.com/BOSU2905/WEC-Analysis-2026.git
cd WEC-Analysis-2026

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**4. Run with systemd:**

Create `/etc/systemd/system/wec-dashboard.service`:
```ini
[Unit]
Description=WEC Dashboard
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/WEC-Analysis-2026
Environment="PATH=/home/ubuntu/WEC-Analysis-2026/venv/bin"
ExecStart=/home/ubuntu/WEC-Analysis-2026/venv/bin/python app_dash.py

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable wec-dashboard
sudo systemctl start wec-dashboard
sudo systemctl status wec-dashboard
```

**5. Setup Nginx reverse proxy:**

Install Nginx:
```bash
sudo apt install nginx -y
```

Configure `/etc/nginx/sites-available/wec-dashboard`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8050;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/wec-dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## ☁️ Streamlit Cloud (Streamlit Version Only)

### Deployment Steps

**1. Push to GitHub:**
```bash
git add .
git commit -m "Ready for Streamlit Cloud"
git push origin main
```

**2. Deploy on Streamlit Cloud:**
- Go to [share.streamlit.io](https://share.streamlit.io)
- Sign in with GitHub
- Click "New app"
- Select repository: `BOSU2905/WEC-Analysis-2026`
- Main file path: `app.py`
- Click "Deploy"

**3. Custom Domain (Optional):**
- Settings → General → Custom domain
- Add your domain
- Update DNS CNAME record

### Streamlit Cloud Config

Create `.streamlit/config.toml`:
```toml
[theme]
primaryColor = "#E10600"
backgroundColor = "#0A0A0A"
secondaryBackgroundColor = "#1E1E1E"
textColor = "#FFFFFF"
font = "sans serif"

[server]
maxUploadSize = 200
enableCORS = false
```

---

## ✅ Production Checklist

### Security
- [ ] Remove debug mode: `debug=False`
- [ ] Set strong secret keys
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS/SSL
- [ ] Implement rate limiting
- [ ] Add authentication (if needed)

### Performance
- [ ] Enable data caching
- [ ] Optimize large datasets
- [ ] Use CDN for static assets
- [ ] Implement lazy loading
- [ ] Monitor memory usage
- [ ] Setup error logging

### Monitoring
- [ ] Setup application monitoring (e.g., Sentry)
- [ ] Configure log aggregation
- [ ] Setup uptime monitoring
- [ ] Enable performance monitoring
- [ ] Create alerting rules

### Backup
- [ ] Backup data directory
- [ ] Version control configuration
- [ ] Document deployment process
- [ ] Create disaster recovery plan

### Testing
- [ ] Test all filters
- [ ] Test all visualizations
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Load testing
- [ ] Security testing

---

## 🔐 Environment Variables

Create `.env` file:
```bash
# App Configuration
FLASK_ENV=production
DEBUG=False
PORT=8050

# Data Configuration
DATA_PATH=Data/raw/wec_data.csv

# Optional: Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Optional: Cache
REDIS_URL=redis://localhost:6379

# Optional: Monitoring
SENTRY_DSN=your-sentry-dsn
```

Load in `app_dash.py`:
```python
from dotenv import load_dotenv
import os

load_dotenv()
PORT = int(os.getenv('PORT', 8050))
DEBUG = os.getenv('DEBUG', 'False') == 'True'
```

---

## 📊 Monitoring & Logging

### Setup Logging

Add to `app_dash.py`:
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('wec_dashboard.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

logger.info('WEC Dashboard starting...')
```

### Setup Sentry (Error Tracking)

```bash
pip install sentry-sdk
```

Add to `app_dash.py`:
```python
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0
)
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy WEC Dashboard

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        python -m pytest tests/
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "wec-dashboard-2026"
        heroku_email: "your@email.com"
```

---

## 🌐 Custom Domain Setup

### Cloudflare DNS
1. Add A record: `@` → `your-server-ip`
2. Add CNAME: `www` → `your-domain.com`
3. Enable SSL/TLS → Full

### Let's Encrypt SSL (Free)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
sudo certbot renew --dry-run
```

---

## 📞 Support & Troubleshooting

### Common Issues

**1. App won't start**
```bash
# Check logs
tail -f wec_dashboard.log

# Check port availability
lsof -i :8050
```

**2. High memory usage**
```bash
# Monitor memory
htop

# Restart app
sudo systemctl restart wec-dashboard
```

**3. Slow performance**
- Enable data caching
- Reduce filter options
- Optimize queries
- Upgrade server resources

### Get Help
- GitHub Issues: [Create issue](https://github.com/BOSU2905/WEC-Analysis-2026/issues)
- Check logs for errors
- Review deployment documentation

---

**Happy Deploying!** 🚀🏁
