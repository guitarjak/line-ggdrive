# 📖 LineFileSaver - User Guide for Non-Technical Users

**Welcome!** This guide will help you set up and use LineFileSaver, even if you've never done anything technical before. We'll use simple language and lots of pictures!

---

## 🎯 What is LineFileSaver?

**The Problem:**
- You send important files in LINE (photos, documents, videos)
- After a while, LINE deletes them automatically
- You can't find them when you need them later 😢

**The Solution:**
- LineFileSaver automatically saves ALL your LINE files
- Files are kept forever (not deleted!)
- You can find and download them anytime from the web
- Simple, automatic, and safe 🎉

---

## 🚀 Getting Started (5 Easy Steps)

### Step 1: Create Your Account

1. **Go to the website**: `https://linefilesaver.com`
2. **Click "Sign Up"** (the big button on the homepage)
3. **Fill in the form**:
   - Your email address
   - Create a password (make it strong!)
   - Your name
4. **Click "Create Account"**
5. **Check your email** for a confirmation link
6. **Click the link** in the email to verify your account

✅ **Done!** You now have an account!

---

### Step 2: Get Your LINE Official Account

**What is a LINE Official Account?**
It's a special type of LINE account for businesses and services (like our file saver bot). It's FREE to create!

#### How to Create One:

1. **Go to**: [https://developers.line.biz/console/](https://developers.line.biz/console/)

2. **Sign in** with your LINE account
   - Use the same LINE you use on your phone

3. **Click "Create a new provider"**
   - Provider name: Any name you like (e.g., "My Files")
   - Click "Create"

4. **Click "Create a Messaging API channel"**
   Fill in:
   - **Channel name**: "My File Saver" (or any name)
   - **Channel description**: "Saves my LINE files"
   - **Category**: Choose "Tools"
   - **Subcategory**: Choose "Other"
   - Check all the agreement boxes
   - Click "Create"

5. **Find your credentials** (2 important codes you'll need):

   **First code - Channel Secret:**
   - Go to "Basic settings" tab
   - Find "Channel secret"
   - Click "Show" and copy it (save it somewhere!)

   **Second code - Channel Access Token:**
   - Go to "Messaging API" tab
   - Scroll down to "Channel access token"
   - Click "Issue" button
   - Copy the long token that appears (save it!)

✅ **Done!** You have your LINE Official Account!

---

### Step 3: Connect Your LINE Account to LineFileSaver

Now we'll tell LineFileSaver about your LINE account so it can save files for you.

1. **Log in** to LineFileSaver
2. **Click "Add LINE Channel"** button
3. **Fill in the form**:
   - **Channel Name**: Give it a nickname (e.g., "My Personal LINE")
   - **Channel Secret**: Paste the first code you saved
   - **Channel Access Token**: Paste the second code you saved
4. **Click "Connect"**

LineFileSaver will automatically test if the codes work!

- ✅ **Green checkmark** = Success!
- ❌ **Red X** = Something wrong, check the codes again

5. **Copy your Webhook URL**
   - You'll see something like: `https://api.linefilesaver.com/webhook/abc123`
   - Click "Copy" button

✅ **Done!** Your channel is connected!

---

### Step 4: Set Up the Webhook (Tell LINE to send files to us)

Now we need to tell LINE: "When someone sends a file, send it to LineFileSaver too!"

1. **Go back** to LINE Developers Console: [https://developers.line.biz/console/](https://developers.line.biz/console/)

2. **Click on your channel** (the one you created earlier)

3. **Go to "Messaging API" tab**

4. **Find "Webhook settings"**:
   - **Webhook URL**: Paste the URL you copied from LineFileSaver
   - Click "Update"
   - Click "Verify" button
   - You should see "Success" ✅

5. **Enable webhook**:
   - Find the toggle switch next to "Use webhook"
   - Turn it **ON** (should be green)

6. **Disable auto-reply** (optional but recommended):
   - Scroll down to "Auto-reply messages"
   - Turn it **OFF**

7. **Add the bot to your LINE**:
   - Find the QR code on the same page
   - Open LINE on your phone
   - Scan the QR code
   - Add the bot as a friend

✅ **Done!** Everything is connected!

---

### Step 5: Test It! 🎉

Let's make sure everything works:

1. **Open LINE** on your phone
2. **Go to your bot's chat** (the one you just added)
3. **Send a photo or file**
4. **Wait 5-10 seconds**
5. **Go to LineFileSaver dashboard** on your computer
6. **Refresh the page**
7. **You should see your file!** 🎊

✅ **Congratulations!** Your file saver is working!

---

## 📱 Using LineFileSaver Daily

### How It Works Automatically

Once set up, you don't need to do ANYTHING! Here's what happens:

1. Someone sends a file in LINE (photo, video, document)
2. LineFileSaver automatically detects it
3. The file is saved to your storage
4. You can see it in your dashboard
5. You can download it anytime!

**That's it!** No commands needed, no buttons to click. Just use LINE normally! 😊

---

## 🖥️ Using the Web Dashboard

### Main Dashboard

When you log in, you'll see:

```
┌─────────────────────────────────────┐
│  📊 Your Dashboard                  │
├─────────────────────────────────────┤
│  💾 Storage                         │
│  45 MB / 100 MB used (45%)         │
│  ━━━━━━━━━━━━━━━░░░░░░░░░░          │
│                                     │
│  📁 Files: 23                       │
│  📱 LINE Channels: 1                │
│                                     │
│  Recent Files:                      │
│  🖼️ IMG_1234.jpg   2.3 MB   [View] │
│  🎥 VID_5678.mp4  15.0 MB   [View] │
│  📄 document.pdf   1.2 MB   [View] │
└─────────────────────────────────────┘
```

**What you see:**
- **Storage bar**: Shows how much space you're using
- **File count**: Total files saved
- **Recent files**: Last 5 files uploaded
- **Quick actions**: Buttons to view files

### Finding Your Files

**Click "Files" in the menu** to see all your files.

You can:
- **View as grid** (big thumbnails) or **list** (small rows)
- **Filter by type**: Show only photos, videos, or documents
- **Search**: Type filename to find it
- **Sort**: By date (newest first) or name (A-Z)

**Each file shows:**
- Thumbnail (for images/videos)
- Filename
- Size
- Date uploaded
- Who sent it (LINE username)
- Buttons: Download, Delete, View Details

### Downloading Files

1. Find the file you want
2. Click the **Download** button (↓ icon)
3. File will download to your computer
4. That's it! Simple! 😊

### Deleting Files

If you want to free up space:

1. Find the file
2. Click the **Delete** button (🗑️ icon)
3. Confirm "Are you sure?"
4. File is deleted and space is freed

**Tip:** Deleted files are gone forever! Download first if you might need it later.

---

## 💬 Using the LINE Bot

You can also interact with the bot directly in LINE!

### Commands

Just type these in your chat with the bot:

| Command | What it does | Example |
|---------|-------------|---------|
| `/help` | Show all commands | Just type `/help` |
| `/files` | List recent files | Shows last 5 files |
| `/search <name>` | Find a file | `/search photo` |
| `/quota` | Check storage space | Shows how much space left |
| `/link` | Get web dashboard link | Quick link to website |

### Examples

**Check your storage:**
```
You: /quota

Bot: 💾 Storage Status
     45 MB / 100 MB used (45%)
     You have 55 MB remaining
```

**Find a file:**
```
You: /search birthday

Bot: 🔍 Found 3 files matching "birthday":
     1. birthday-cake.jpg (2 MB)
        📅 May 15, 2025
        [View] [Download]

     2. birthday-video.mp4 (10 MB)
        📅 May 15, 2025
        [View] [Download]
```

**See recent files:**
```
You: /files

Bot: 📁 Your recent files:
     1. photo-001.jpg (2 MB) - 2 hours ago
     2. document.pdf (1 MB) - 1 day ago
     3. video.mp4 (15 MB) - 3 days ago

     View all: https://linefilesaver.com/files
```

---

## 🆘 Common Problems & Solutions

### Problem 1: Files Not Being Saved

**Symptoms:**
- You send a file in LINE
- It doesn't appear in dashboard

**Solutions:**

✅ **Check 1**: Is the webhook turned on?
- Go to LINE Developers Console
- Messaging API tab
- "Use webhook" should be ON (green)

✅ **Check 2**: Is your storage full?
- Check dashboard - is storage at 100%?
- If yes, delete old files or upgrade plan

✅ **Check 3**: Is the LINE channel active?
- Dashboard → Channels
- Should show "Active" status
- If not, click "Activate"

---

### Problem 2: Can't Log In

**Symptoms:**
- Forgot password
- Email not working

**Solutions:**

✅ **Forgot password?**
1. Click "Forgot Password" on login page
2. Enter your email
3. Check email for reset link
4. Click link and create new password

✅ **Email not verified?**
1. Check spam folder for verification email
2. Still not there? Click "Resend verification email"

---

### Problem 3: Webhook Verification Failed

**Symptoms:**
- Red X mark when testing webhook
- "Verification failed" message

**Solutions:**

✅ **Double-check the webhook URL:**
1. Copy it EXACTLY from LineFileSaver dashboard
2. Make sure no extra spaces
3. Should start with `https://`
4. Paste into LINE Developers Console
5. Click "Verify" again

✅ **Check your Channel Secret and Token:**
1. Make sure you copied them correctly
2. No extra spaces or characters
3. Re-issue the token if needed:
   - LINE Developers → Messaging API
   - Channel access token → "Issue"
   - Copy new token to LineFileSaver

---

### Problem 4: Storage Full

**Symptoms:**
- Can't save new files
- Message: "Storage quota exceeded"

**Solutions:**

✅ **Delete old files:**
1. Dashboard → Files
2. Sort by "Oldest first"
3. Delete files you don't need
4. Storage will update automatically

✅ **Upgrade your plan:**
1. Dashboard → Billing
2. Click "Upgrade to Pro"
3. Get 5 GB storage instead of 100 MB!

---

## 💰 Pricing & Plans

### Free Plan (Perfect for starting!)
- ✅ 100 MB storage
- ✅ 1 LINE channel
- ✅ Unlimited files
- ✅ Files kept for 30 days
- ✅ Web dashboard
- ✅ Basic search

**Best for:** Personal use, trying out the service

---

### Pro Plan ($9.99/month)
- ✅ 5 GB storage (50x more!)
- ✅ 3 LINE channels
- ✅ Unlimited files
- ✅ Files kept for 1 year
- ✅ Advanced search
- ✅ Bulk download
- ✅ Priority support

**Best for:** Heavy users, small teams

---

### Enterprise Plan ($49.99/month)
- ✅ 50 GB storage
- ✅ Unlimited LINE channels
- ✅ Unlimited files
- ✅ Files kept forever
- ✅ API access
- ✅ Custom branding
- ✅ 24/7 support

**Best for:** Businesses, teams, power users

---

## 🔒 Privacy & Security

### Is my data safe?

**YES!** Here's how we keep your files secure:

✅ **Encryption**: All files encrypted in storage
✅ **Private**: Only you can see your files
✅ **Secure**: HTTPS connection always
✅ **Isolated**: Your data separated from other users
✅ **Backups**: Daily backups in case of emergencies

### Who can see my files?

**Only YOU!**
- Each user has completely separate storage
- Not even other LineFileSaver users can see your files
- We (LineFileSaver staff) cannot see your files
- LINE cannot see your files after they're saved

### Can I delete my account?

**Yes!** You have full control:

1. Dashboard → Settings
2. Scroll to bottom
3. Click "Delete Account"
4. Confirm deletion
5. All your data is permanently deleted

---

## 📞 Getting Help

### Need help? We're here!

**Email Support:**
- Email: support@linefilesaver.com
- We reply within 24-48 hours
- Include screenshots if possible!

**Documentation:**
- Check this guide first
- See [FAQ](./FAQ.md) for common questions
- Video tutorials (coming soon!)

**Community:**
- LINE Group: [Join our community]
- Share tips and tricks!

---

## 🎓 Pro Tips

### Tip 1: Organize Your Files

Use clear filenames in LINE:
- ❌ `IMG_1234.jpg`
- ✅ `birthday-party-2025.jpg`

Then searching is easier!

### Tip 2: Regular Cleanup

Set a monthly reminder to:
1. Review old files
2. Delete what you don't need
3. Keep storage healthy

### Tip 3: Use Multiple Channels

Have different LINE accounts?
- Work LINE
- Personal LINE
- Family LINE

Add them all! Each can save files separately.

### Tip 4: Download Important Files

For super important files:
1. Download to your computer
2. Save to Google Drive / Dropbox too
3. Better safe than sorry!

---

## 🎉 You're All Set!

Congratulations! You now know how to:
- ✅ Set up your account
- ✅ Connect LINE
- ✅ Save files automatically
- ✅ Find and download files
- ✅ Use the bot commands
- ✅ Solve common problems

**Now just use LINE normally and we'll handle the rest!** 🎊

---

## 📚 Quick Reference

### Important Links
- Website: https://linefilesaver.com
- Dashboard: https://linefilesaver.com/dashboard
- LINE Developers: https://developers.line.biz/console/
- Support: support@linefilesaver.com

### Key Numbers
- Free storage: 100 MB
- Pro storage: 5 GB
- Files per page: 20
- Search results: Up to 50

### Keyboard Shortcuts (on website)
- `Ctrl/Cmd + K`: Quick search
- `Ctrl/Cmd + U`: Upload file
- `Ctrl/Cmd + F`: Find in page

---

**Questions?** Check our [FAQ](./FAQ.md) or email us! 💌
