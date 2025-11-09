# ❓ Frequently Asked Questions (FAQ)

## 🌟 General Questions

### What is LineFileSaver?

LineFileSaver is a service that automatically saves all files sent in your LINE chats so they never disappear. Instead of LINE deleting files after a few weeks, we keep them safe forever in your personal storage.

---

### Do I need technical knowledge to use it?

**No!** We designed LineFileSaver specifically for non-technical users. If you can use LINE, you can use LineFileSaver. Our setup guide uses simple language and includes pictures for every step.

---

### How much does it cost?

We have three plans:

- **Free**: 100 MB storage, perfect for trying it out
- **Pro**: $9.99/month, 5 GB storage for regular users
- **Enterprise**: $49.99/month, 50 GB for heavy users

You can start free and upgrade anytime!

---

### Is my data safe?

**Absolutely!** We take security seriously:
- All files are encrypted
- Your files are completely private (only you can see them)
- Secure HTTPS connection
- Daily backups
- Compliant with data protection regulations

---

##  💡 How It Works

### How does LineFileSaver get my files?

When someone sends a file in your LINE chat:
1. LINE sends a copy to our bot
2. We save it to your personal storage
3. You can access it anytime from our website or LINE bot

**Important:** We only save files sent AFTER you set up the service. Old files from before setup are not saved.

---

### What types of files can I save?

We support ALL file types that LINE supports:
- **Images**: JPG, PNG, GIF, etc.
- **Videos**: MP4, MOV, etc.
- **Audio**: MP3, M4A, etc.
- **Documents**: PDF, Word, Excel, PowerPoint, etc.
- **Other**: ZIP, RAR, any file type!

---

### Does it work in LINE groups?

**Yes!** If you add our bot to a LINE group, it will save all files shared in that group. This is perfect for:
- Work teams sharing documents
- Family groups sharing photos
- Friend groups sharing videos

---

### Can I save files from multiple LINE accounts?

**Yes!** You can connect multiple LINE Official Accounts to one LineFileSaver account. Perfect if you have:
- Personal LINE
- Work LINE
- Different LINE accounts for different purposes

Each account on our Pro plan can connect up to 3 LINE channels.

---

## 🔧 Setup & Configuration

### I created a LINE Official Account, now what?

Follow these steps:
1. Get your Channel Secret and Channel Access Token from LINE Developers Console
2. Log into LineFileSaver
3. Click "Add LINE Channel"
4. Paste your credentials
5. Copy the webhook URL
6. Paste it into LINE Developers Console
7. Enable webhook
8. Test by sending a file!

See our [User Guide](./USER_GUIDE.md) for detailed step-by-step instructions with pictures.

---

### What is a "webhook"?

A webhook is a way for LINE to automatically send information to our service. Think of it as a delivery address:

- When a file is sent in LINE, LINE needs to know where to deliver it
- The webhook URL is like your "delivery address"
- LINE sends the file to that address
- We receive it and save it for you

You just need to copy-paste the URL, no technical knowledge needed!

---

### Do I need to create a new LINE account?

**No!** You keep using your regular LINE account.

What you create is a "LINE Official Account" which is different:
- It's a free bot account (like a robot helper)
- You add this bot to your chat
- The bot receives copies of files
- You still use your normal LINE as usual

---

### I got "Webhook verification failed" error. What do I do?

This usually means the URL wasn't copied correctly. Try these:

1. **Copy the webhook URL again** from LineFileSaver (click the copy button)
2. **Go to LINE Developers Console**
3. **Delete the old URL completely**
4. **Paste the new URL** (make sure no extra spaces!)
5. **Click "Update"** then **"Verify"**

Still not working? Check that:
- Your Channel Secret is correct in LineFileSaver
- Your Channel Access Token is correct
- The webhook toggle is ON in LINE Console

---

## 📱 Using the Service

### Do I need to do anything to save files?

**Nope!** Once you're set up, everything is automatic:
- Just use LINE normally
- Send and receive files as usual
- We save them automatically in the background
- No commands needed, no buttons to click

It's truly "set it and forget it!" 😊

---

### How long does it take to save a file?

Very fast! Usually:
- Small files (photos): 5-10 seconds
- Medium files (documents): 10-20 seconds
- Large files (videos): 30-60 seconds

You'll see the file appear in your dashboard after this time.

---

### Can I upload files directly to LineFileSaver?

Currently, files can only be uploaded through LINE. This ensures:
- Proper tracking of where files came from
- Integration with your LINE conversations
- Automatic organization

Direct upload from the web is a feature we're considering for the future!

---

### How do I find a specific file?

Multiple ways:

**Method 1: Search**
- Dashboard → Click search box
- Type filename, date, or keywords
- Results appear instantly

**Method 2: Filter**
- Click "Images" to see only photos
- Click "Videos" to see only videos
- Click "Documents" to see only docs

**Method 3: Sort**
- Sort by date (newest first)
- Sort by name (A-Z)
- Sort by size (largest first)

**Method 4: LINE Bot**
- Message the bot: `/search birthday`
- Bot shows matching files

---

### Can I share files with others?

Currently, files are private to your account only.

**Workarounds:**
1. Download the file
2. Share it through LINE, email, or other methods

We're considering adding a "share link" feature in the future!

---

## 💾 Storage & Limits

### How much storage do I get?

Depends on your plan:
- **Free**: 100 MB (about 50-100 photos)
- **Pro**: 5 GB (about 2,500-5,000 photos)
- **Enterprise**: 50 GB (about 25,000-50,000 photos)

Video files are larger, so fewer videos can be stored.

---

### What happens when I run out of storage?

When you reach 100% of your quota:

1. You'll get a warning when you hit 90%
2. At 100%, new files won't be saved
3. You'll receive notifications in LINE and email
4. Existing files remain safe

**Solutions:**
- Delete old files you don't need
- Upgrade to a larger plan
- Download files and delete them from LineFileSaver

---

### Can I download all my files at once?

**Pro plan and above:** Yes!
- Go to Files page
- Click "Select All"
- Click "Download Selected"
- Files download as a ZIP file

**Free plan:** You can download files one at a time.

---

### If I delete a file, is it gone forever?

**Yes.** When you delete a file:
- It's immediately removed from our servers
- Storage space is freed up
- This cannot be undone

**Tip:** Download important files before deleting them!

---

### How long are files kept?

Depends on your plan:
- **Free**: 30 days, then automatically deleted
- **Pro**: 1 year
- **Enterprise**: Forever (until you delete them)

We'll send reminder emails before files are auto-deleted.

---

## 💰 Billing & Subscriptions

### Can I start with free and upgrade later?

**Absolutely!** Here's how it works:

1. Start with free plan (100 MB)
2. Use it for a while
3. When you need more space, click "Upgrade"
4. Choose Pro or Enterprise
5. Your existing files carry over
6. New storage quota applies immediately

No data loss, seamless transition! 🎉

---

### What payment methods do you accept?

We accept:
- Credit cards (Visa, Mastercard, Amex)
- Debit cards
- PayPal (coming soon)

All payments processed securely through Stripe.

---

### Can I cancel anytime?

**Yes!** No contracts, no commitments:

1. Dashboard → Billing
2. Click "Cancel Subscription"
3. Confirm cancellation
4. You keep access until end of billing period
5. Then downgrade to free plan automatically

Your files remain safe (up to free plan limit).

---

### What happens to my files if I cancel Pro plan?

When you cancel Pro ($9.99/month):

1. You keep access until end of current billing period
2. Account downgrades to Free plan (100 MB)
3. If you have more than 100 MB of files:
   - You get 30 days to download or delete files
   - Can't upload new files until under 100 MB
   - Existing files remain accessible during grace period

**Recommendation:** Download important files before canceling.

---

### Do you offer refunds?

- **First month:** 30-day money-back guarantee if not satisfied
- **After first month:** Prorated refund for unused time
- **Extenuating circumstances:** Contact support@linefilesaver.com

We want you to be happy with the service!

---

## 🔒 Privacy & Security

### Can LineFileSaver staff see my files?

**No.** Here's our policy:

- Files are encrypted in storage
- We cannot view file contents
- Our support staff never accesses your files
- Only you have access through your login

**Exception:** We may access files only:
- If you explicitly request support help with a specific file
- If legally required by court order
- To investigate abuse/illegal content

---

### What happens to my data if I delete my account?

When you delete your account:

1. All files permanently deleted from our servers
2. All metadata (filenames, dates) deleted
3. LINE channel connections removed
4. Account information erased
5. Cannot be recovered

**This process is irreversible!** Download important files first.

---

### Where are files stored?

Files are stored on Supabase servers which use:
- AWS data centers
- Multiple geographic regions for redundancy
- Enterprise-grade security
- Daily backups
- Compliance with GDPR, SOC 2

---

### Is my LINE username/data shared?

**No sharing!** We keep your data private:
- Your LINE account info is not shared with anyone
- No selling of data to third parties
- No advertising partnerships
- Used only to provide the service to you

See our [Privacy Policy](./PRIVACY_POLICY.md) for full details.

---

## 🐛 Troubleshooting

### Files aren't being saved automatically

**Check these:**

1. **Is webhook enabled?**
   - LINE Developers Console
   - Messaging API tab
   - "Use webhook" should be ON (green)

2. **Is storage full?**
   - Check dashboard
   - If at 100%, delete files or upgrade

3. **Is channel active?**
   - Dashboard → Channels
   - Should show "Active" status

4. **Test with a simple photo**
   - Send a small photo
   - Wait 10 seconds
   - Refresh dashboard
   - Should appear

Still not working? Email support@linefilesaver.com with:
- Your email address
- Screenshot of LINE webhook settings
- Screenshot of LineFileSaver channel status

---

### I can't log in

**Common solutions:**

1. **Forgot password?**
   - Click "Forgot Password"
   - Enter email
   - Check email for reset link

2. **Wrong email?**
   - Try any email addresses you commonly use
   - Check for typos

3. **Email not verified?**
   - Check spam folder
   - Click "Resend verification email"

4. **Account blocked?**
   - After 5 failed login attempts, account locks for 30 minutes
   - Wait 30 minutes or use "Forgot Password"

---

### Files are showing but won't download

**Try these:**

1. **Refresh the page**
   - Sometimes browsers cache old data
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

2. **Check file size**
   - Very large files may take time
   - Wait a minute and try again

3. **Try different browser**
   - Chrome, Firefox, Safari all supported
   - Issue might be browser-specific

4. **Check internet connection**
   - Slow connection = slow downloads
   - Try on faster WiFi

---

### Bot is not responding to commands

**Check these:**

1. **Are you using the right bot?**
   - Make sure it's the bot you set up
   - Check the bot name

2. **Command format correct?**
   - Must start with `/`
   - Example: `/help` not `help`

3. **Is channel active?**
   - Dashboard → Channels
   - Should say "Active"

4. **Wait a moment**
   - Bot might be processing
   - Give it 10-15 seconds

---

## 📞 Support & Contact

### How do I contact support?

**Email:** support@linefilesaver.com
- We reply within 24-48 hours (usually faster!)
- Include as many details as possible
- Screenshots are very helpful

**Live Chat:** Coming soon!

**LINE Group:** Join our user community for peer support

---

### What should I include in a support email?

Help us help you faster:

✅ **Include:**
- Your email address (that you use to log in)
- Detailed description of the problem
- What you've already tried
- Screenshots (if applicable)
- Error messages (exact wording)

❌ **Don't include:**
- Your password
- Channel Secret/Access Token (unless we specifically ask)

---

### Do you offer phone support?

Currently, we offer email support only. Phone support is available for Enterprise plan customers.

---

## 🚀 Feature Requests

### Can you add feature X?

We love feedback! Request features:

1. **Email:** support@linefilesaver.com
2. **Subject:** "Feature Request: [Your Idea]"
3. **Describe:** What feature and why it would be useful

Popular requests get prioritized!

---

### What features are coming soon?

**Planned features:**

- ✅ Mobile app (iOS & Android)
- ✅ Shared folders (team collaboration)
- ✅ Advanced AI search
- ✅ File preview (without downloading)
- ✅ Automatic organization by date/type
- ✅ Integration with Google Drive, Dropbox
- ✅ Custom download links with expiry

**When?** Follow our [Roadmap](./ROADMAP.md) for updates!

---

## 🎓 Advanced Topics

### Can I use the API?

**Enterprise plan only** currently. The API allows:
- Programmatic access to files
- Custom integrations
- Automation scripts
- Third-party app connections

Contact us for API documentation.

---

### Can I self-host LineFileSaver?

Currently, no. LineFileSaver is a hosted service only.

However, the code is based on open-source components. If you're a developer, you could:
1. Check our GitHub repository
2. Fork the code
3. Deploy your own instance
4. Requires technical knowledge

---

### Can I use this for my business?

**Absolutely!** Many businesses use LineFileSaver for:
- Saving customer submissions
- Archiving project files
- Team collaboration
- Compliance/record-keeping

**Recommendations:**
- Pro plan for small teams (3 channels)
- Enterprise plan for larger organizations
- Contact us for custom enterprise solutions

---

## 📚 More Help

Still have questions?

📖 **Read:**
- [User Guide](./USER_GUIDE.md) - Complete step-by-step guide
- [Setup Guide](./SETUP.md) - Technical setup details

💌 **Contact:**
- Email: support@linefilesaver.com
- LINE Group: [Join here]

🎥 **Watch:**
- Video tutorials (coming soon!)
- YouTube channel (coming soon!)

---

**Didn't find your answer?** Email us! We're here to help. 😊
