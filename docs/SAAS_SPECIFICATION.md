# 🎯 LineFileSaver - Full SaaS Platform Specification

## 📋 Executive Summary

**Product Name**: LineFileSaver
**Tagline**: "Never lose your LINE files again"
**Model**: Multi-tenant SaaS (Software as a Service)
**Target Users**: Anyone who uses LINE and wants to save files permanently

### What It Does
- Users sign up on web app
- Enter their LINE Official Account credentials
- Bot automatically saves all files sent in their LINE chats
- Users can view, search, download files from web dashboard or LINE bot
- Each user has their own isolated storage

### Key Differentiators
- ✅ **Self-service**: No technical setup needed
- ✅ **Automatic**: Saves files without user action
- ✅ **Permanent**: Files never expire
- ✅ **Accessible**: Web dashboard + LINE bot
- ✅ **Affordable**: Free tier available

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    USERS                                  │
│  👤 Customer A    👤 Customer B    👤 Customer C         │
└───────┬──────────────────┬──────────────────┬───────────┘
        │                  │                  │
        │ Web Browser      │                  │
        ▼                  ▼                  ▼
┌──────────────────────────────────────────────────────────┐
│              NEXT.JS WEB APP (Vercel)                    │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐       │
│  │Landing Page│  │ Dashboard  │  │ File Browser │       │
│  └────────────┘  └────────────┘  └──────────────┘       │
└───────┬──────────────────────────────────────────────────┘
        │ API calls
        ▼
┌──────────────────────────────────────────────────────────┐
│           NODE.JS BACKEND API (Railway)                  │
│  ┌────────────────┐  ┌──────────────────────────┐       │
│  │Webhook Handler │  │  Multi-tenant Router     │       │
│  │(per channel)   │  │  (isolate user data)     │       │
│  └────────────────┘  └──────────────────────────┘       │
└───────┬──────────────────┬───────────────────────────────┘
        │                  │
        ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│  SUPABASE        │  │ SUPABASE STORAGE │
│  (PostgreSQL)    │  │ (File Storage)   │
│  - Accounts      │  │ Per-user buckets │
│  - LINE channels │  │ Organized folders│
│  - Files         │  │ CDN delivery     │
│  - Usage         │  │                  │
└──────────────────┘  └──────────────────┘
        ▲
        │ Auth, RLS
        │
┌──────────────────┐
│  SUPABASE AUTH   │
│  Email/Password  │
│  Social Login    │
└──────────────────┘

        ┌─ LINE Platform ─┐
        │  Customer A bot  │ ──► Webhook ──► API ──► User A storage
        │  Customer B bot  │ ──► Webhook ──► API ──► User B storage
        └──────────────────┘
```

---

## 🗄️ Database Schema (Multi-tenant)

### Accounts Table
```typescript
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  storage_quota_mb INTEGER DEFAULT 100,  -- Free tier: 100MB
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,

  -- Billing (if monetized)
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ
);

-- RLS Policy: Users can only see their own account
CREATE POLICY "Users can view own account"
  ON accounts FOR ALL
  USING (auth.uid() = id);
```

### LINE Channels Table
```typescript
CREATE TABLE line_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,

  -- LINE credentials
  channel_name TEXT NOT NULL,              -- User-defined name
  channel_secret TEXT NOT NULL,            -- Encrypted
  channel_access_token TEXT NOT NULL,      -- Encrypted

  -- Status
  is_active BOOLEAN DEFAULT true,
  webhook_verified BOOLEAN DEFAULT false,
  last_webhook_at TIMESTAMPTZ,

  -- Webhook URL (unique per channel)
  webhook_id TEXT UNIQUE NOT NULL,         -- Short ID for webhook URL

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for webhook routing
CREATE INDEX idx_line_channels_webhook_id ON line_channels(webhook_id);

-- RLS Policy: Users can only see their own channels
CREATE POLICY "Users can manage own channels"
  ON line_channels FOR ALL
  USING (account_id = auth.uid());
```

### Files Table
```typescript
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  line_channel_id UUID REFERENCES line_channels(id) ON DELETE SET NULL,

  -- File metadata
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,                 -- 'image', 'video', 'audio', 'file'
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,

  -- Storage
  storage_path TEXT NOT NULL,              -- Path in Supabase Storage
  storage_bucket TEXT DEFAULT 'user-files',
  download_url TEXT,                       -- Public URL
  thumbnail_url TEXT,                      -- For images/videos

  -- LINE metadata
  line_message_id TEXT,
  uploaded_by_line_user_id TEXT,
  uploaded_by_line_username TEXT,
  line_group_id TEXT,                      -- If from group chat

  -- Timestamps
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ,

  -- Search
  search_vector tsvector                   -- For text search
);

-- Indexes
CREATE INDEX idx_files_account_id ON files(account_id);
CREATE INDEX idx_files_uploaded_at ON files(uploaded_at DESC);
CREATE INDEX idx_files_file_type ON files(file_type);
CREATE INDEX idx_files_search_vector ON files USING GIN(search_vector);

-- Full-text search index
CREATE OR REPLACE FUNCTION files_search_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('simple',
    COALESCE(NEW.filename, '') || ' ' ||
    COALESCE(NEW.uploaded_by_line_username, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER files_search_update_trigger
  BEFORE INSERT OR UPDATE ON files
  FOR EACH ROW EXECUTE FUNCTION files_search_update();

-- RLS Policy: Users can only see their own files
CREATE POLICY "Users can manage own files"
  ON files FOR ALL
  USING (account_id = auth.uid());
```

### Usage Tracking Table
```typescript
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE UNIQUE,

  -- Current usage
  storage_used_mb DECIMAL(10,2) DEFAULT 0,
  file_count INTEGER DEFAULT 0,

  -- Monthly tracking
  current_month_uploads INTEGER DEFAULT 0,
  current_month_downloads INTEGER DEFAULT 0,

  -- Limits
  storage_quota_mb INTEGER DEFAULT 100,

  last_updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
CREATE POLICY "Users can view own usage"
  ON usage_tracking FOR SELECT
  USING (account_id = auth.uid());
```

### Activity Log Table (Optional)
```typescript
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,

  action TEXT NOT NULL,                    -- 'file_uploaded', 'file_downloaded', etc.
  resource_type TEXT,                      -- 'file', 'channel', etc.
  resource_id UUID,
  metadata JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
CREATE POLICY "Users can view own activity"
  ON activity_log FOR SELECT
  USING (account_id = auth.uid());
```

---

## 🎨 Frontend (Next.js 14)

### Project Structure

```
web/
├── app/
│   ├── (auth)/                          # Auth layout
│   │   ├── login/
│   │   │   └── page.tsx                 # Login page
│   │   └── signup/
│   │       └── page.tsx                 # Signup page
│   ├── (dashboard)/                     # Protected layout
│   │   ├── layout.tsx                   # Dashboard layout
│   │   ├── dashboard/
│   │   │   └── page.tsx                 # Main dashboard
│   │   ├── files/
│   │   │   ├── page.tsx                 # File browser
│   │   │   └── [id]/page.tsx            # File detail
│   │   ├── channels/
│   │   │   ├── page.tsx                 # LINE channels list
│   │   │   ├── new/page.tsx             # Add new channel
│   │   │   └── [id]/page.tsx            # Edit channel
│   │   ├── settings/
│   │   │   └── page.tsx                 # Account settings
│   │   └── billing/
│   │       └── page.tsx                 # Billing (optional)
│   ├── page.tsx                         # Landing page
│   ├── pricing/page.tsx                 # Pricing page
│   ├── layout.tsx                       # Root layout
│   └── globals.css
├── components/
│   ├── ui/                              # shadcn/ui components
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── StatsCard.tsx
│   ├── files/
│   │   ├── FileGrid.tsx
│   │   ├── FileCard.tsx
│   │   └── FileUpload.tsx
│   └── channels/
│       ├── ChannelCard.tsx
│       └── ChannelSetup.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # Supabase client
│   │   ├── auth.ts                      # Auth helpers
│   │   └── queries.ts                   # Database queries
│   └── utils.ts
├── types/
│   └── index.ts
└── package.json
```

### Key Features

#### Landing Page
- Hero section with value proposition
- Features showcase
- Pricing tiers
- Call-to-action (Sign up)
- Testimonials (future)

#### Dashboard
- Overview stats (storage, files, channels)
- Recent files preview
- Quick actions
- Usage charts

#### File Browser
- Grid/list view toggle
- Filter by type (images, videos, docs)
- Filter by date
- Search by filename
- Bulk operations
- Preview modal
- Download button

#### LINE Channel Setup
- Step-by-step wizard:
  1. Enter channel name
  2. Enter credentials
  3. Auto-verify
  4. Get webhook URL
  5. Instructions to paste in LINE console
  6. Verify webhook
  7. Done!

---

## 🔧 Backend (Node.js - Updated)

### New API Endpoints

```typescript
// Auth (Supabase handles, but we track sessions)
POST /api/auth/callback                  // After Supabase auth

// Account management
GET  /api/account                        // Get account info
PUT  /api/account                        // Update account
GET  /api/account/usage                  // Get usage stats

// LINE Channels
GET    /api/channels                     // List user's channels
POST   /api/channels                     // Create new channel
GET    /api/channels/:id                 // Get channel details
PUT    /api/channels/:id                 // Update channel
DELETE /api/channels/:id                 // Delete channel
POST   /api/channels/:id/verify          // Verify webhook
GET    /api/channels/:id/webhook-url     // Get webhook URL

// Files
GET    /api/files                        // List user's files (paginated)
GET    /api/files/:id                    // Get file details
DELETE /api/files/:id                    // Delete file
GET    /api/files/search?q=...           // Search files
POST   /api/files/:id/download           // Track download, return URL

// Webhook (per channel)
POST /webhook/:webhookId                 // LINE webhook endpoint
```

### Webhook Routing Logic

```typescript
// /webhook/:webhookId
async function handleWebhook(req, res) {
  const { webhookId } = req.params;

  // 1. Find channel by webhook ID
  const channel = await db.query.lineChannels.findFirst({
    where: eq(lineChannels.webhookId, webhookId),
    with: { account: true }
  });

  if (!channel || !channel.is_active) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  // 2. Verify LINE signature using channel's secret
  const signature = req.headers['x-line-signature'];
  const body = JSON.stringify(req.body);
  const isValid = verifySignature(body, signature, channel.channel_secret);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // 3. Check storage quota
  const usage = await getUsage(channel.account_id);
  if (usage.storage_used_mb >= usage.storage_quota_mb) {
    // Send LINE message: "Storage full"
    await notifyStorageFull(channel);
    return res.status(200).json({ success: true });
  }

  // 4. Process events
  const events = req.body.events || [];

  for (const event of events) {
    if (event.type === 'message' &&
        ['image', 'video', 'audio', 'file'].includes(event.message.type)) {

      // Queue file processing job
      await fileQueue.add('process-file', {
        accountId: channel.account_id,
        channelId: channel.id,
        messageId: event.message.id,
        fileType: event.message.type,
        userId: event.source.userId,
        groupId: event.source.groupId,
      });
    }
  }

  // 5. Respond quickly to LINE
  res.status(200).json({ success: true });
}
```

### File Processing Job

```typescript
async function processFileJob(job) {
  const { accountId, channelId, messageId, fileType, userId, groupId } = job.data;

  try {
    // 1. Download file from LINE
    const fileData = await downloadFromLine(channelId, messageId);

    // 2. Generate storage path
    const filename = generateFilename(fileType, fileData.mimeType);
    const storagePath = `${accountId}/${fileType}/${filename}`;

    // 3. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('user-files')
      .upload(storagePath, fileData.buffer, {
        contentType: fileData.mimeType,
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // 4. Get public URL
    const { data: urlData } = supabase.storage
      .from('user-files')
      .getPublicUrl(storagePath);

    // 5. Create file record in database
    const fileRecord = await db.insert(files).values({
      account_id: accountId,
      line_channel_id: channelId,
      filename,
      file_type: fileType,
      mime_type: fileData.mimeType,
      file_size_bytes: fileData.size,
      storage_path: storagePath,
      download_url: urlData.publicUrl,
      line_message_id: messageId,
      uploaded_by_line_user_id: userId,
      line_group_id: groupId,
    }).returning();

    // 6. Update usage tracking
    await updateUsage(accountId, fileData.size);

    // 7. Send confirmation to LINE (optional)
    await sendLineMessage(channelId, userId,
      `✅ ไฟล์ ${filename} บันทึกสำเร็จแล้ว!`
    );

    return fileRecord;

  } catch (error) {
    logger.error('File processing failed', error);

    // Notify user of error
    await sendLineMessage(channelId, userId,
      '❌ เกิดข้อผิดพลาดในการบันทึกไฟล์ กรุณาลองใหม่อีกครั้ง'
    );

    throw error;
  }
}
```

---

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS enabled:

```sql
-- Enable RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Policies ensure users can only access their own data
-- See schema section for specific policies
```

### Encryption

- LINE credentials stored encrypted in database
- Environment variables for encryption keys
- HTTPS only (enforced by Vercel/Railway)

### Rate Limiting

```typescript
// Per user rate limits
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  keyGenerator: (req) => req.user.id,
});
```

---

## 💰 Pricing Tiers

### Free Tier
- **Storage**: 100 MB
- **Files**: Unlimited
- **Channels**: 1 LINE channel
- **Retention**: 30 days
- **Support**: Community

### Pro Tier ($9.99/month)
- **Storage**: 5 GB
- **Files**: Unlimited
- **Channels**: 3 LINE channels
- **Retention**: 1 year
- **Support**: Email (48h response)
- **Features**: Advanced search, bulk download

### Enterprise Tier ($49.99/month)
- **Storage**: 50 GB
- **Files**: Unlimited
- **Channels**: Unlimited
- **Retention**: Unlimited
- **Support**: Priority (24h response)
- **Features**: API access, custom domain, SSO

---

## 📊 Success Metrics

### Key Metrics to Track

1. **User Acquisition**
   - Signups per day/week/month
   - Conversion rate (visitor → signup)
   - Activation rate (signup → first file saved)

2. **Engagement**
   - DAU/MAU (Daily/Monthly Active Users)
   - Files uploaded per user per month
   - Average session duration

3. **Revenue** (if monetized)
   - MRR (Monthly Recurring Revenue)
   - Churn rate
   - ARPU (Average Revenue Per User)

4. **Technical**
   - API response time
   - Webhook success rate
   - Storage usage per user
   - Error rate

---

## 🚀 Launch Checklist

### Pre-launch
- [ ] Complete development and testing
- [ ] Create landing page with clear value prop
- [ ] Write comprehensive user documentation
- [ ] Set up analytics (Google Analytics, PostHog)
- [ ] Set up error tracking (Sentry)
- [ ] Prepare support email/chat
- [ ] Create demo video
- [ ] Test with beta users

### Launch
- [ ] Deploy to production
- [ ] Announce on social media
- [ ] Submit to Product Hunt
- [ ] Post on relevant LINE communities
- [ ] Email beta users

### Post-launch
- [ ] Monitor metrics daily
- [ ] Collect user feedback
- [ ] Fix critical bugs within 24h
- [ ] Weekly feature updates
- [ ] Monthly blog posts

---

## 🎯 Development Timeline

**Total: 5-6 weeks**

### Week 1-2: Foundation
- Next.js app setup
- Supabase integration
- Landing page
- Auth flow
- Database schema

### Week 3: LINE Integration
- Channel management UI
- Webhook routing
- File processing
- Storage integration

### Week 4: File Management
- File browser
- Search functionality
- Download/delete
- Usage tracking

### Week 5: Polish
- Onboarding flow
- User documentation
- Error handling
- Performance optimization

### Week 6: Optional Features
- Billing integration (Stripe)
- Advanced search
- Bulk operations
- Analytics dashboard

---

**Next**: Start building the web app! 🎨
