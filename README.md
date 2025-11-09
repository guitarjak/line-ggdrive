# LINE File Search Bot 🤖

AI-powered LINE bot that saves files to Google Drive and enables smart semantic search. Built for **non-developer maintenance** with visual workflows and automated deployment.

## ✨ Features

- 📁 **Automatic File Backup**: Saves all files (images, videos, audio, documents) from LINE to Google Drive
- 🔍 **AI-Powered Search**: Find files using natural language queries (Thai & English)
- 💬 **Context-Aware**: Remembers conversation context around files
- 🌐 **Multi-Language**: Thai and English support
- 🔒 **Secure**: Signature verification, encrypted storage
- 📊 **Analytics**: Track usage and search patterns

## 🎯 Quick Start

### For Non-Developers

1. **Click "Deploy to Railway"** button below
2. **Follow the setup guide** in [SETUP.md](./docs/SETUP.md)
3. **Done!** Your bot is live

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template)

### For Developers

```bash
# Clone repository
git clone https://github.com/yourusername/line-file-search-bot.git
cd line-file-search-bot

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npm run db:generate
npm run db:migrate

# Start development server
npm run dev
```

## 📚 Documentation

- 📖 [**Setup Guide**](./docs/SETUP.md) - Complete setup instructions
- 🛠️ [**Maintenance Guide**](./docs/MAINTENANCE.md) - For non-developers
- 🚀 [**Deployment Guide**](./docs/DEPLOYMENT.md) - Deploy to Railway
- 🏗️ [**Architecture**](./docs/ARCHITECTURE.md) - System design
- 💻 [**API Reference**](./docs/API.md) - For developers

## 🤖 Bot Commands

| Command | Description |
|---------|-------------|
| `/help` | Show help message |
| `/status` | Check bot status |
| `/save` | Save the file you sent |
| `/list` | View all your files |
| `/search <query>` | Search files with AI |

## 🏗️ Tech Stack

- **Backend**: Node.js + TypeScript + Express
- **Database**: Supabase (PostgreSQL)
- **Storage**: Google Drive API
- **AI**: OpenAI GPT-4 + Embeddings
- **Vector DB**: Pinecone
- **Queue**: BullMQ + Redis
- **Workflows**: n8n
- **Deployment**: Railway

## 📊 System Status

Check current status of all components:

```bash
curl https://your-bot-url.railway.app/health
```

## 🔒 Security

- ✅ LINE signature verification
- ✅ HTTPS only
- ✅ Environment variable encryption
- ✅ Row-level security (Supabase)
- ✅ Rate limiting
- ✅ File type validation

## 📈 Roadmap

### Phase 1: Core Bot ✅ (Current)
- [x] LINE webhook integration
- [x] Basic commands
- [x] Database schema
- [x] Railway deployment

### Phase 2: File Storage (In Progress)
- [ ] Google Drive integration
- [ ] File download & upload
- [ ] Organized folder structure
- [ ] File metadata tracking

### Phase 3: Search Foundation
- [ ] OpenAI embeddings
- [ ] Pinecone vector database
- [ ] Basic text search

### Phase 4: AI Search
- [ ] Natural language queries
- [ ] Semantic search
- [ ] Context-aware results
- [ ] Thai language optimization

### Phase 5: Conversation Context
- [ ] Message history tracking
- [ ] Conversation threading
- [ ] File-discussion linking

### Phase 6: Advanced Features
- [ ] Web admin dashboard
- [ ] Multi-group support
- [ ] Analytics & insights
- [ ] OCR for images

## 💰 Cost Estimate

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Railway | $5 credit | $5-10/month |
| Supabase | 500MB DB | Free |
| Google Drive | 15GB | Free |
| OpenAI | Pay-per-use | $20-50/month |
| Pinecone | 1 index | Free (100K vectors) |
| **Total** | - | **$25-60/month** |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md).

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

## 🆘 Support

- 📧 Email: support@example.com
- 💬 LINE: @yourbot
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/line-file-search-bot/issues)

## 🙏 Acknowledgments

- [LINE Messaging API](https://developers.line.biz/)
- [n8n](https://n8n.io/) - Workflow automation
- [Railway](https://railway.app/) - Deployment platform
- [Supabase](https://supabase.com/) - Database platform

---

Made with ❤️ for the LINE community
