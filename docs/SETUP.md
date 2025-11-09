# 🚀 Setup Guide

Complete guide to set up your LINE File Search Bot from scratch.

## 📋 Prerequisites

Before starting, you'll need:

- LINE Official Account (free)
- Supabase account (free tier available)
- Railway account (free tier available)
- Google Cloud account (for Drive API)
- OpenAI account (for AI features - Phase 4)
- Pinecone account (for search - Phase 4)

## 📝 Step-by-Step Setup

### 1️⃣ Create LINE Official Account

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Click "Create a new provider"
   - Provider name: Your company/project name
3. Click "Create a Messaging API channel"
   - Channel name: Your bot name (e.g., "File Search Bot")
   - Channel description: Brief description
   - Category: Choose appropriate category
   - Subcategory: Choose appropriate subcategory
4. After creation, go to "Messaging API" tab:
   - Copy **Channel Secret** (you'll need this)
   - Issue a **Channel Access Token** (long-lived)
   - Copy the access token (you'll need this)

### 2️⃣ Create Supabase Project

1. Go to [Supabase](https://supabase.com/)
2. Click "New Project"
   - Organization: Create or select
   - Project name: line-file-bot
   - Database password: Generate strong password (save it!)
   - Region: Choose closest to your users
3. Wait for project to be created (~2 minutes)
4. Get your credentials:
   - Go to **Project Settings > API**
   - Copy **Project URL** (SUPABASE_URL)
   - Copy **anon public** key (SUPABASE_ANON_KEY)
   - Go to **Project Settings > Database**
   - Copy **Connection string (URI)** (SUPABASE_DB_URL)
   - Replace `[YOUR-PASSWORD]` with your database password

### 3️⃣ Deploy to Railway

#### Option A: Deploy Button (Easiest)

1. Click the "Deploy to Railway" button in README
2. Sign in with GitHub
3. Click "Deploy Now"
4. Wait for deployment (~3 minutes)

#### Option B: Manual Deployment

1. Fork this repository to your GitHub account
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your forked repository
5. Railway will auto-detect the Dockerfile and deploy

### 4️⃣ Configure Environment Variables

In Railway dashboard:

1. Click on your project
2. Go to "Variables" tab
3. Add these environment variables:

```env
# Required for Phase 1
LINE_CHANNEL_SECRET=your_channel_secret_from_line
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token_from_line
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_DB_URL=postgres://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres

# Optional (add later for Phase 2+)
# GOOGLE_SERVICE_ACCOUNT_EMAIL=
# GOOGLE_PRIVATE_KEY=
# GOOGLE_DRIVE_FOLDER_ID=
# OPENAI_API_KEY=
# PINECONE_API_KEY=
# PINECONE_ENVIRONMENT=
# PINECONE_INDEX_NAME=
```

4. Click "Deploy" to restart with new variables

### 5️⃣ Set Up Database

1. Open Railway deployment URL
2. Add `/health` to check if it's running
   - You should see: `{"status":"ok",...}`

3. Run database migrations:

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run npm run db:migrate
```

**Option B: Using Supabase SQL Editor**
```sql
-- Copy the generated SQL from drizzle/0000_*.sql
-- Paste and run in Supabase SQL Editor
```

### 6️⃣ Configure LINE Webhook

1. Get your Railway deployment URL:
   - In Railway dashboard, copy the public URL
   - It looks like: `https://your-app.railway.app`

2. Go back to LINE Developers Console
3. Go to your channel → "Messaging API" tab
4. Set **Webhook URL**: `https://your-app.railway.app/webhook`
5. Click "Verify" - should show success ✅
6. Enable "Use webhook"
7. Disable "Auto-reply messages" (unless you want default replies)

### 7️⃣ Test Your Bot

1. In LINE Developers Console, find your bot's QR code
   - Go to "Messaging API" tab
   - Scan the QR code with your LINE app
2. Add the bot as a friend
3. Send `/help` command
4. You should get a welcome message! 🎉

## 🎉 Phase 1 Complete!

Your bot is now live and can:
- ✅ Receive messages
- ✅ Handle commands (/help, /status)
- ✅ Store message history in database
- ✅ Auto-deploy on git push

## 🔜 Next Steps

### For Phase 2 (File Storage):
- Set up Google Drive API (see [GOOGLE_DRIVE_SETUP.md](./GOOGLE_DRIVE_SETUP.md))
- Configure n8n workflows (see [N8N_SETUP.md](./N8N_SETUP.md))

### For Phase 4 (AI Search):
- Set up OpenAI API (see [OPENAI_SETUP.md](./OPENAI_SETUP.md))
- Set up Pinecone (see [PINECONE_SETUP.md](./PINECONE_SETUP.md))

## 🆘 Troubleshooting

### Bot doesn't respond
- Check Railway logs for errors
- Verify webhook URL is correct and verified
- Check environment variables are set correctly

### Database connection failed
- Verify SUPABASE_DB_URL is correct
- Check database password is correct
- Ensure IP whitelist allows connections (Supabase)

### Webhook verification failed
- Check LINE_CHANNEL_SECRET is correct
- Ensure webhook URL is HTTPS (Railway provides this automatically)

## 📚 Additional Resources

- [LINE Messaging API Docs](https://developers.line.biz/en/docs/messaging-api/)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Docs](https://docs.railway.app/)

---

Need help? Open an issue on GitHub or contact support!
