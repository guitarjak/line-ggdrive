# 🛠️ Non-Developer Maintenance Guide

This guide helps **non-technical owners** maintain and manage the LINE File Search Bot.

## 🎯 Overview

You don't need to be a developer to maintain this bot! Most tasks can be done through visual dashboards and simple configuration files.

## 📊 Daily Monitoring

### Check Bot Health

**How often**: Once per day (5 minutes)

1. Visit your bot URL + `/health`
   - Example: `https://your-app.railway.app/health`
2. You should see:
   ```json
   {"status":"ok","timestamp":"...","version":"1.0.0"}
   ```
3. If you see an error page, check the troubleshooting section below

### Check Railway Dashboard

1. Go to [Railway Dashboard](https://railway.app/)
2. Click on your project
3. Look at the "Deployments" tab:
   - ✅ Green = Running (good!)
   - 🔴 Red = Failed (needs attention)
4. Check "Metrics" tab:
   - CPU usage (should be < 50%)
   - Memory usage (should be < 80%)
   - Request count (track usage)

### Check Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click on your project
3. Check:
   - Database size (under "Database" → "Database")
   - Active connections (should be < 10 for small bots)
   - API requests (under "API")

## 🎨 Common Maintenance Tasks

### 1. Change Bot Messages (No coding!)

**Task**: Update welcome message, help text, etc.

**Steps**:
1. Go to your GitHub repository
2. Navigate to: `src/services/messages.ts`
3. Click the pencil icon (Edit)
4. Find the message you want to change (in Thai or English section)
5. Edit the text
6. Click "Commit changes" at the bottom
7. Wait 2-3 minutes - Railway will auto-deploy! ✨

**Example**: Change welcome message
```typescript
// Find this line in messagesTH:
welcome: `สวัสดีค่ะ! 👋\n\n...`

// Change to:
welcome: `สวัสดีจ้า! ยินดีต้อนรับ 👋\n\n...`
```

### 2. Add/Remove Supported File Types

**Task**: Allow or block certain file types

**Steps**:
1. Go to Railway Dashboard
2. Click "Variables" tab
3. Find `SUPPORTED_FILE_TYPES`
4. Edit value (comma-separated):
   - Current: `image,video,audio,file`
   - Remove video: `image,audio,file`
   - Add only images: `image`
5. Click "Deploy" to apply changes

### 3. Change Bot Language

**Task**: Switch between Thai and English

**Steps**:
1. Railway Dashboard → Variables
2. Find `BOT_LANGUAGE`
3. Change value:
   - Thai: `th`
   - English: `en`
4. Click "Deploy"

### 4. Set Maximum File Size

**Task**: Limit file sizes to save storage

**Steps**:
1. Railway Dashboard → Variables
2. Find `MAX_FILE_SIZE`
3. Edit value (in bytes):
   - 10MB = `10485760`
   - 50MB = `52428800`
   - 100MB = `104857600`
4. Click "Deploy"

### 5. Add Admin Users

**Task**: Give special permissions to certain users

**Steps**:
1. Get LINE User IDs (send `/status` to bot, check logs)
2. Railway Dashboard → Variables
3. Find `ADMIN_USER_IDS`
4. Add user IDs (comma-separated):
   - Example: `U1234567890,Uabcdefghij`
5. Click "Deploy"

## 📈 View Logs (Troubleshooting)

### Railway Logs

**When**: Bot not responding, errors, debugging

**Steps**:
1. Railway Dashboard → Your project
2. Click "Deployments" tab
3. Click on the latest deployment
4. Click "View Logs" button
5. You'll see color-coded logs:
   - 🟢 Green = INFO (normal)
   - 🟡 Yellow = WARN (watch out)
   - 🔴 Red = ERROR (problem!)

**What to look for**:
- `✅ Server running on port 3000` = Good!
- `❌ Database connection failed` = Check Supabase
- `⚠️ Invalid LINE signature` = Check webhook config

### Supabase Logs

**When**: Database errors

**Steps**:
1. Supabase Dashboard → Your project
2. Click "Logs" in sidebar
3. Filter by:
   - Errors only
   - Last 24 hours
4. Look for red error messages

## 💰 Monitor Costs

### Monthly Cost Check (10 minutes)

**Railway**:
1. Dashboard → Billing
2. See current month usage
3. Free tier: $5 credit
4. Typical cost: $5-10/month

**Supabase**:
1. Dashboard → Billing
2. Check database size
3. Free tier: 500MB
4. Typical: Free (under 500MB)

**OpenAI** (Phase 4):
1. Go to [OpenAI Usage](https://platform.openai.com/usage)
2. Check current month
3. Typical: $20-50/month

**Google Drive**:
1. Check [Google Drive Storage](https://one.google.com/storage)
2. Free tier: 15GB
3. Upgrade: $1.99/month for 100GB

**Total Estimate**: $25-60/month (after all phases)

## 🚨 Troubleshooting Common Issues

### Issue: Bot doesn't respond to messages

**Checklist**:
- [ ] Check Railway deployment is green
- [ ] Visit `/health` endpoint - should return OK
- [ ] Check Railway logs for errors
- [ ] Verify LINE webhook is enabled
- [ ] Test with `/help` command

**Fix**:
1. Railway Dashboard → Deployments
2. Click three dots → "Restart"
3. Wait 1-2 minutes
4. Test again

### Issue: Files not saving (Phase 2+)

**Checklist**:
- [ ] Check Google Drive API is configured
- [ ] Verify `GOOGLE_DRIVE_FOLDER_ID` is set
- [ ] Check Railway logs for Google errors
- [ ] Ensure Drive folder has space

**Fix**:
1. Check environment variables
2. Verify service account has access
3. Check Railway logs for specific error

### Issue: Search not working (Phase 4+)

**Checklist**:
- [ ] Verify `OPENAI_API_KEY` is set
- [ ] Check `PINECONE_API_KEY` is set
- [ ] Check OpenAI account has credits
- [ ] Check Pinecone index exists

**Fix**:
1. Verify all AI environment variables
2. Check OpenAI billing
3. Restart Railway deployment

### Issue: High costs

**Solutions**:
1. **Reduce file size limit**:
   - Set `MAX_FILE_SIZE` to smaller value
2. **Limit file types**:
   - Remove video support (largest files)
3. **Optimize AI usage**:
   - Increase search cache duration
   - Use smaller embedding model
4. **Clean old files**:
   - Delete files older than X months

## 📞 When to Call a Developer

You should contact a developer when:

- ❌ Bot is completely down for > 1 hour
- ❌ Database corruption or data loss
- ❌ Need to add major new features
- ❌ Security vulnerabilities discovered
- ❌ Need to change database schema
- ❌ Multiple users reporting same issue

## 📋 Monthly Checklist

**Every month** (15 minutes):

- [ ] Check all service costs
- [ ] Review Railway metrics
- [ ] Check database size (Supabase)
- [ ] Review error logs
- [ ] Test all bot commands
- [ ] Check Google Drive storage
- [ ] Update dependencies (optional, ask developer)

## 🎓 Learning Resources

### Video Tutorials (Coming Soon)
- [ ] "Understanding your bot's dashboard" (5 min)
- [ ] "Changing bot messages" (3 min)
- [ ] "Reading logs for errors" (5 min)
- [ ] "Monthly maintenance routine" (10 min)

### Useful Links
- [Railway Documentation](https://docs.railway.app/)
- [Supabase Documentation](https://supabase.com/docs)
- [LINE Messaging API](https://developers.line.biz/en/docs/)

## 📧 Getting Help

1. **Check this guide first** ✅
2. **Search GitHub Issues**: [Your Repo Issues](https://github.com/yourusername/line-file-search-bot/issues)
3. **Create new issue**: Provide screenshots and error logs
4. **Contact developer**: For urgent issues

---

💡 **Remember**: Most maintenance is just monitoring dashboards and changing simple text values. You got this! 💪
