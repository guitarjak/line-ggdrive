# 🚀 Deployment Guide

Guide for deploying LINE File Search Bot to production.

## 🎯 Deployment Options

### Option 1: Railway (Recommended)
- ✅ Easiest setup
- ✅ Auto-deploy on git push
- ✅ Free tier available
- ✅ Built-in SSL/HTTPS
- ✅ Auto-scaling

### Option 2: Google Cloud Run
- ✅ Pay-per-use pricing
- ✅ Scales to zero
- ✅ Good for high traffic
- ⚠️ Requires gcloud CLI

### Option 3: Self-Hosted (VPS)
- ✅ Full control
- ✅ Cheapest for high traffic
- ⚠️ Requires server management
- ⚠️ Manual SSL setup

## 🚂 Railway Deployment (Detailed)

### Prerequisites
- GitHub account
- Railway account (free)
- Git installed locally

### Step 1: Prepare Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/line-file-search-bot.git
cd line-file-search-bot

# Or fork and clone your fork
```

### Step 2: Connect to Railway

**Option A: Using Railway Dashboard**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repository
6. Railway will auto-detect Dockerfile and start building

**Option B: Using Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to GitHub repo
railway link

# Deploy
railway up
```

### Step 3: Add Environment Variables

In Railway Dashboard:

1. Click on your project
2. Go to "Variables" tab
3. Click "Raw Editor"
4. Paste your environment variables:

```env
LINE_CHANNEL_SECRET=your_secret_here
LINE_CHANNEL_ACCESS_TOKEN=your_token_here
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_DB_URL=postgres://postgres:password@db.xxxxx.supabase.co:5432/postgres
NODE_ENV=production
```

5. Click "Deploy"

### Step 4: Configure Custom Domain (Optional)

1. In Railway Dashboard → Settings
2. Click "Generate Domain" (gets you a .railway.app domain)
3. Or add custom domain:
   - Click "Add Custom Domain"
   - Enter your domain (e.g., bot.yourdomain.com)
   - Add CNAME record to your DNS:
     ```
     CNAME bot.yourdomain.com -> your-app.railway.app
     ```
   - Wait for SSL to provision (automatic)

### Step 5: Run Database Migrations

```bash
# Using Railway CLI
railway run npm run db:migrate

# Or manually in Supabase SQL Editor
# (copy SQL from drizzle/0000_*.sql)
```

### Step 6: Verify Deployment

1. Visit: `https://your-app.railway.app/health`
2. Should see:
   ```json
   {"status":"ok","timestamp":"2025-01-01T00:00:00.000Z","version":"1.0.0"}
   ```

### Step 7: Configure LINE Webhook

1. LINE Developers Console
2. Your channel → Messaging API
3. Webhook URL: `https://your-app.railway.app/webhook`
4. Click "Verify" → Should succeed ✅
5. Enable "Use webhook"

## ☁️ Google Cloud Run Deployment

### Prerequisites
- Google Cloud account
- gcloud CLI installed
- Docker installed

### Step 1: Build Container

```bash
# Build for Cloud Run
docker build -t gcr.io/YOUR_PROJECT_ID/line-bot:latest .

# Test locally
docker run -p 3000:3000 --env-file .env gcr.io/YOUR_PROJECT_ID/line-bot:latest
```

### Step 2: Push to Container Registry

```bash
# Configure Docker for GCR
gcloud auth configure-docker

# Push image
docker push gcr.io/YOUR_PROJECT_ID/line-bot:latest
```

### Step 3: Deploy to Cloud Run

```bash
# Deploy
gcloud run deploy line-file-bot \
  --image gcr.io/YOUR_PROJECT_ID/line-bot:latest \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars "LINE_CHANNEL_SECRET=xxx,LINE_CHANNEL_ACCESS_TOKEN=xxx,SUPABASE_URL=xxx,..."

# Get URL
gcloud run services describe line-file-bot --region asia-southeast1 --format 'value(status.url)'
```

### Step 4: Configure Environment Variables

```bash
# Set environment variables
gcloud run services update line-file-bot \
  --region asia-southeast1 \
  --update-env-vars-file .env.yaml

# Or use Secret Manager
gcloud secrets create line-channel-secret --data-file=-
gcloud run services update line-file-bot \
  --region asia-southeast1 \
  --update-secrets=LINE_CHANNEL_SECRET=line-channel-secret:latest
```

## 🖥️ Self-Hosted (VPS) Deployment

### Prerequisites
- VPS (e.g., DigitalOcean, Linode, AWS EC2)
- Ubuntu 22.04+ or Debian 11+
- Domain name
- SSH access

### Step 1: Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx certbot python3-certbot-nginx
```

### Step 2: Deploy Application

```bash
# Clone repository
cd /opt
git clone https://github.com/yourusername/line-file-search-bot.git
cd line-file-search-bot

# Install dependencies
npm ci --only=production

# Build TypeScript
npm run build

# Set up environment
cp .env.example .env
nano .env  # Edit with your credentials
```

### Step 3: Configure PM2

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'line-bot',
    script: './dist/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Start with PM2
pm2 start ecosystem.config.js

# Set up auto-restart
pm2 startup
pm2 save
```

### Step 4: Configure Nginx

```bash
# Create Nginx config
cat > /etc/nginx/sites-available/line-bot << 'EOF'
server {
    listen 80;
    server_name bot.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/line-bot /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 5: Set Up SSL

```bash
# Get SSL certificate
certbot --nginx -d bot.yourdomain.com

# Auto-renewal is set up automatically
```

### Step 6: Set Up Auto-Deploy (Optional)

```bash
# Create deploy script
cat > /opt/line-file-search-bot/deploy.sh << 'EOF'
#!/bin/bash
cd /opt/line-file-search-bot
git pull
npm ci --only=production
npm run build
pm2 restart line-bot
EOF

chmod +x deploy.sh

# Create webhook endpoint for GitHub
# (requires additional setup - see GitHub Actions)
```

## 🔄 Continuous Deployment

### Railway (Automatic)
- Push to `main` branch → Auto-deploys ✨
- No additional setup needed

### GitHub Actions + Cloud Run

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: ${{ secrets.GCP_PROJECT_ID }}
          service_account_key: ${{ secrets.GCP_SA_KEY }}

      - name: Build and Push
        run: |
          docker build -t gcr.io/${{ secrets.GCP_PROJECT_ID }}/line-bot:${{ github.sha }} .
          docker push gcr.io/${{ secrets.GCP_PROJECT_ID }}/line-bot:${{ github.sha }}

      - name: Deploy
        run: |
          gcloud run deploy line-file-bot \
            --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/line-bot:${{ github.sha }} \
            --platform managed \
            --region asia-southeast1
```

## 🔍 Post-Deployment Checklist

- [ ] Health check passes (`/health`)
- [ ] LINE webhook verified
- [ ] Bot responds to `/help`
- [ ] Database connection works
- [ ] Logs show no errors
- [ ] SSL certificate valid (HTTPS)
- [ ] Environment variables set correctly
- [ ] Monitoring set up (optional)

## 📊 Monitoring & Alerts

### Railway
- Built-in metrics dashboard
- View in Railway project → Metrics

### Uptime Monitoring (Free)
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://www.pingdom.com/)
- Monitor `/health` endpoint
- Get alerts via email/SMS

### Log Aggregation (Optional)
- Railway: Built-in logs (7 days retention)
- Cloud Run: Google Cloud Logging
- Self-hosted: Set up Loki + Grafana

## 🔒 Security Checklist

- [ ] All secrets in environment variables (not code)
- [ ] HTTPS only (no HTTP)
- [ ] LINE signature verification enabled
- [ ] Rate limiting configured
- [ ] Database has Row Level Security (Supabase)
- [ ] Regular security updates (npm audit)
- [ ] Firewall configured (VPS only)
- [ ] Monitoring for suspicious activity

## 🆘 Rollback Procedure

### Railway
1. Dashboard → Deployments
2. Click on previous working deployment
3. Click "Redeploy"

### Cloud Run
```bash
# List revisions
gcloud run revisions list --service line-file-bot

# Rollback to specific revision
gcloud run services update-traffic line-file-bot \
  --to-revisions REVISION_NAME=100
```

### Self-Hosted
```bash
cd /opt/line-file-search-bot
git log  # Find previous working commit
git checkout <commit-hash>
npm ci --only=production
npm run build
pm2 restart line-bot
```

---

Need help with deployment? Open an issue on GitHub!
