# 📋 Quick Reference Guide

Fast lookup for common tasks and commands.

## 🔧 Environment Variables

### Required for Phase 1

| Variable | Where to get it | Example |
|----------|----------------|---------|
| `LINE_CHANNEL_SECRET` | LINE Developers Console > Channel > Messaging API | `abc123def456...` |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE Developers Console > Channel > Messaging API > Issue Token | `xyz789abc123...` |
| `SUPABASE_URL` | Supabase Dashboard > Project Settings > API | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase Dashboard > Project Settings > API | `eyJhbGci...` |
| `SUPABASE_DB_URL` | Supabase Dashboard > Project Settings > Database > Connection String | `postgres://postgres:pass@db...` |

### Optional (Add Later)

| Variable | Required for | Where to get it |
|----------|-------------|----------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Phase 2 (File Storage) | Google Cloud Console |
| `GOOGLE_PRIVATE_KEY` | Phase 2 (File Storage) | Google Cloud Console |
| `GOOGLE_DRIVE_FOLDER_ID` | Phase 2 (File Storage) | Google Drive URL |
| `OPENAI_API_KEY` | Phase 4 (AI Search) | OpenAI Platform |
| `PINECONE_API_KEY` | Phase 4 (AI Search) | Pinecone Console |

## 🤖 Bot Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Show help message | Just type `/help` |
| `/status` | Check bot & system status | Just type `/status` |
| `/save` | Save recent file | Send file, then type `/save` |
| `/list` | List all saved files | Just type `/list` |
| `/search <query>` | Search files with AI | `/search ใบเสนอราคา` |

## 📊 Important URLs

### Your Bot URLs
- Health Check: `https://your-app.railway.app/health`
- Webhook: `https://your-app.railway.app/webhook`
- Root: `https://your-app.railway.app/`

### Service Dashboards
- Railway: https://railway.app/dashboard
- Supabase: https://supabase.com/dashboard
- LINE Developers: https://developers.line.biz/console/
- Google Cloud: https://console.cloud.google.com/
- OpenAI: https://platform.openai.com/
- Pinecone: https://app.pinecone.io/

## 💻 NPM Scripts

| Command | What it does | When to use |
|---------|-------------|-------------|
| `npm install` | Install dependencies | First time setup, after pulling updates |
| `npm run dev` | Start development server | Local development |
| `npm run build` | Compile TypeScript to JavaScript | Before deploying |
| `npm start` | Start production server | Production (Railway does this) |
| `npm run typecheck` | Check TypeScript errors | Before committing |
| `npm run lint` | Check code style | Before committing |
| `npm run db:generate` | Generate database migrations | After schema changes |
| `npm run db:migrate` | Run database migrations | After deployment |

## 🗄️ Database Tables

### `users`
- Stores LINE user information
- Primary key: `id` (LINE user ID)
- Tracks: name, picture, language, last active

### `chat_messages`
- Stores all messages for context
- Primary key: `id` (UUID)
- Links to: user, group, message content

### `files`
- Stores file metadata
- Primary key: `id` (UUID)
- Links to: user, message, Drive URL, search index

### `search_queries`
- Logs all search queries
- Primary key: `id` (UUID)
- Tracks: query text, results count, timestamp

## 🔍 Log Messages Meaning

### ✅ Good (Green)
- `✅ Server running on port 3000` - Server started successfully
- `✅ Database connected` - Database connection OK
- `File stored: filename.pdf` - File saved successfully

### ⚠️ Warning (Yellow)
- `⚠️ Database not connected` - Running in limited mode
- `⚠️ Google Drive not configured` - Phase 2 features disabled

### ❌ Error (Red)
- `❌ Database connection failed` - Check SUPABASE_DB_URL
- `❌ Invalid LINE signature` - Check LINE_CHANNEL_SECRET
- `Failed to download file` - File expired or network issue

## 🚨 Quick Troubleshooting

### Bot not responding
```bash
# 1. Check if server is running
curl https://your-app.railway.app/health

# 2. Check Railway logs
# Railway Dashboard → Logs

# 3. Restart deployment
# Railway Dashboard → Deployments → Restart
```

### Database errors
```bash
# 1. Test connection manually
# In Railway → Run this:
railway run npm run db:migrate

# 2. Check Supabase status
# Visit: https://status.supabase.com/
```

### Webhook not working
```bash
# 1. Verify webhook URL
# LINE Console → Messaging API → Webhook URL

# 2. Test webhook
curl -X POST https://your-app.railway.app/webhook \
  -H "Content-Type: application/json" \
  -d '{"events":[]}'

# Should return: {"success":true}
```

## 📁 Project Structure

```
line-file-search-bot/
├── src/
│   ├── config/          # Configuration & env validation
│   ├── db/              # Database schema & client
│   ├── handlers/        # Webhook & command handlers
│   ├── services/        # LINE, messages, external APIs
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Logger, helpers
│   └── index.ts         # Main entry point
├── docs/                # Documentation
├── drizzle/             # Database migrations (auto-generated)
├── .env.example         # Environment template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── Dockerfile           # Container image
└── railway.json         # Railway config
```

## 🎨 How to Change Bot Text

1. **Edit file**: `src/services/messages.ts`
2. **Find section**:
   - Thai: `messagesTH`
   - English: `messagesEN`
3. **Change text**:
   ```typescript
   welcome: `Your new welcome message here!`
   ```
4. **Commit to GitHub**
5. **Wait 2-3 minutes** - Auto-deploys!

## 💰 Cost Calculator

### Free Tier Limits
- Railway: $5 credit/month
- Supabase: 500MB DB, 1GB storage, 2GB bandwidth
- Google Drive: 15GB storage
- Pinecone: 100K vectors (1 index)

### Estimated Monthly Costs

| Users | Files/Month | Storage | OpenAI | Total |
|-------|------------|---------|---------|-------|
| 10 | 100 | Free | $5 | **$10** |
| 50 | 500 | Free | $20 | **$30** |
| 100 | 1,000 | $2 | $40 | **$52** |
| 500 | 5,000 | $10 | $100 | **$150** |

## 🔐 Security Checklist

- [ ] All secrets in environment variables
- [ ] HTTPS enabled (automatic on Railway)
- [ ] LINE signature verification enabled
- [ ] Database has Row Level Security
- [ ] `.env` file in `.gitignore`
- [ ] No hardcoded passwords in code
- [ ] Regular dependency updates (`npm audit`)

## 📞 Support Contacts

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/line-file-search-bot/issues)
- **LINE Docs**: https://developers.line.biz/en/docs/
- **Supabase Support**: https://supabase.com/docs/guides/platform/support

## 🎯 Next Phase Checklist

### Ready for Phase 2 (File Storage)?
- [ ] Phase 1 deployed and working
- [ ] Google Cloud account created
- [ ] Service account created
- [ ] Google Drive API enabled
- [ ] Drive folder created
- [ ] Environment variables added
- [ ] n8n installed (optional)

### Ready for Phase 4 (AI Search)?
- [ ] Phase 2 completed (files saving)
- [ ] OpenAI account with credits
- [ ] Pinecone account created
- [ ] Index created in Pinecone
- [ ] Environment variables added
- [ ] Files indexed in database

---

⭐ **Bookmark this page** for quick access to common tasks!
