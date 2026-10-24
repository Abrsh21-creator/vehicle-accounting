# 🗄️ How to Create PostgreSQL Database on Render
## Complete Step-by-Step Guide with Details

---

## 📋 What You'll Get

After following this guide, you'll have:
- ✅ Free PostgreSQL database (500MB storage)
- ✅ Database connection URL
- ✅ All tables created (shareholders, monthly_records)
- ✅ Ready to connect from backend

**Time Required**: 10 minutes

---

## STEP 1: Create Render Account

### 1.1 Go to Render Website
1. Open browser
2. Go to: **https://render.com**
3. You'll see the homepage

### 1.2 Sign Up
**Option A: Sign up with GitHub (Recommended)**
1. Click **"Get Started for Free"** or **"Sign Up"** button
2. Click **"GitHub"** button
3. Authorize Render to access your GitHub account
4. Done! You're logged in ✅

**Option B: Sign up with Email**
1. Click **"Get Started for Free"**
2. Click **"Sign up with Email"**
3. Enter your email and create password
4. Verify email (check inbox)
5. Done! ✅

---

## STEP 2: Create PostgreSQL Database

### 2.1 Access Dashboard
After logging in, you'll see the Render Dashboard.

### 2.2 Create New Database
1. Look for the **"New +"** button (top-right corner)
2. Click it
3. You'll see a dropdown menu with options
4. Click **"PostgreSQL"**

### 2.3 Configure Database Settings

You'll see a form with these fields:

#### **Name** (Required)
```
vehicle-accounting-db
```
This is the internal name (no spaces allowed)

#### **Database** (Auto-filled but you can change)
```
vehicle_accounting
```
This is the actual database name inside PostgreSQL

#### **User** (Auto-generated)
```
[Leave as is - auto-generated like: vehicle_accounting_user]
```

#### **Region** (Important!)
Choose the region **closest to Ethiopia**:
- **Frankfurt (EU Central)** ← Best choice for Ethiopia
- OR **Singapore (Southeast Asia)** ← Alternative

**Why?** Closer = faster response times

#### **PostgreSQL Version**
```
16 (or latest available)
```
Select the newest version

#### **Datadog API Key** (Optional)
```
[Leave blank - not needed]
```

#### **Plan Selection** (Important!)
Click **"Free"** plan:
```
Free
• 256 MB RAM
• 1 GB SSD Storage  
• Free forever
• No credit card required
```

### 2.4 Review and Create
1. Double-check all settings
2. Click the big green **"Create Database"** button at the bottom
3. Wait 1-2 minutes while Render provisions your database

You'll see a progress indicator:
```
Creating PostgreSQL database...
⏳ Provisioning (this takes 1-2 minutes)
```

---

## STEP 3: Get Database Connection Details

### 3.1 Database Dashboard
Once created, you'll be redirected to your database dashboard.

### 3.2 Important Information to Copy

Scroll down to the **"Connections"** section. You'll see several connection strings:

#### **Internal Database URL**
```
postgresql://vehicle_accounting_user:password@dpg-xxxxx/vehicle_accounting
```
This is for connecting from OTHER Render services (backend on Render).

#### **External Database URL** ← **THIS IS WHAT YOU NEED!**
```
postgresql://vehicle_accounting_user:long-password-here@dpg-xxxxx-a.frankfurt-postgres.render.com:5432/vehicle_accounting
```

**COPY THIS URL!** You'll need it for:
- Backend `.env` file
- Connecting from your computer

#### **PSQL Command** (for terminal access)
```
psql postgresql://vehicle_accounting_user:password@host:5432/vehicle_accounting
```

### 3.3 Save Connection Details
**Important!** Copy and save these somewhere safe:

```
==== SAVE THESE ====
Database Name: vehicle_accounting
User: vehicle_accounting_user
Password: [shown in the connection string]
Host: dpg-xxxxx-a.frankfurt-postgres.render.com
Port: 5432

External URL: postgresql://vehicle_accounting_user:password@host:5432/vehicle_accounting
===================
```

---

## STEP 4: Create Database Tables

Now we need to create the tables (shareholders, monthly_records, etc.)

### Method 1: Using Render's Built-in Terminal (Easiest)

#### 4.1 Access Database Shell
1. In your database dashboard, look for the **"Connect"** button (top-right)
2. Click it
3. You'll see connection options
4. Click **"PSQL Command"** or **"External Connection"**
5. A terminal window will open in your browser

You'll see:
```
psql (16.x)
Type "help" for help.

vehicle_accounting=>
```

#### 4.2 Copy Database Schema
1. Open the file: `vehicle-accounting-backend/database.sql`
2. Copy ALL the content (Ctrl+A, Ctrl+C)

#### 4.3 Paste into Terminal
1. In the Render terminal, paste the SQL
2. Press Enter
3. You'll see output like:
```
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 3
CREATE INDEX
CREATE INDEX
...
```

#### 4.4 Verify Tables Created
Run this command:
```sql
\dt
```

You should see:
```
 Schema |      Name       | Type  |      Owner       
--------+-----------------+-------+------------------
 public | shareholders    | table | vehicle_acc_user
 public | monthly_records | table | vehicle_acc_user
 public | users          | table | vehicle_acc_user
```

#### 4.5 Verify Shareholders Data
```sql
SELECT * FROM shareholders;
```

You should see 3 rows:
```
 id |     name      | name_amharic | role | role_amharic | share_percentage | base_capital 
----+---------------+--------------+------+--------------+------------------+-------------
  1 | Amsalu        | አምሳሉ         | ... | ...          | 15.6             | 920000
  2 | Smeneh        | ስመኔህ         | ... | ...          | 12.6             | 741800
  3 | Kes Yeshalem  | ቄስ የሻለም      | ... | ...          | 71.8             | 4218359
```

**Perfect!** ✅ Your database is ready.

### Method 2: Using TablePlus/DBeaver (Alternative)

If you prefer a GUI tool:

#### Option A: TablePlus (Recommended)
1. Download: https://tableplus.com
2. Install and open
3. Click "Create a new connection"
4. Choose "PostgreSQL"
5. Fill in:
   ```
   Name: Vehicle Accounting DB
   Host: [from External URL]
   Port: 5432
   User: [from External URL]
   Password: [from External URL]
   Database: vehicle_accounting
   ```
6. Click "Test" → Should say "Success"
7. Click "Connect"
8. Open SQL tab
9. Paste content from `database.sql`
10. Click "Run"

#### Option B: DBeaver (Free)
1. Download: https://dbeaver.io
2. Install and open
3. Click "Database" → "New Database Connection"
4. Choose "PostgreSQL"
5. Fill in connection details (same as TablePlus)
6. Test connection → Should succeed
7. Open SQL Editor
8. Paste `database.sql` content
9. Execute

---

## STEP 5: Test Database Connection

### 5.1 Quick Test from Render Terminal
```sql
-- Count shareholders
SELECT COUNT(*) FROM shareholders;

-- Should return: 3

-- Check if table is empty
SELECT COUNT(*) FROM monthly_records;

-- Should return: 0 (no records yet)
```

### 5.2 Test from Your Backend (Local)
1. Open `vehicle-accounting-backend/.env`
2. Add your database URL:
   ```
   DATABASE_URL=postgresql://your-connection-string-here
   ```
3. Run backend:
   ```bash
   cd vehicle-accounting-backend
   npm install
   npm start
   ```
4. Check console output:
   ```
   ✅ Database connected successfully at: 2026-10-24...
   🚀 Server running on port 3001
   ```

---

## ✅ Verification Checklist

Check all these:

- [ ] Created Render account
- [ ] Created PostgreSQL database (Free plan)
- [ ] Copied External Database URL
- [ ] Opened PSQL terminal
- [ ] Pasted and ran database.sql
- [ ] Verified 3 tables created (\dt command)
- [ ] Verified 3 shareholders exist (SELECT query)
- [ ] Saved connection details somewhere safe

---

## 🎯 What You Have Now

```
✅ PostgreSQL Database
   - Name: vehicle_accounting
   - Tables: shareholders, monthly_records, users
   - Data: 3 shareholders pre-loaded
   - Storage: 1GB free
   - Location: Frankfurt (or Singapore)
   - Always on (never sleeps)

✅ Connection String
   External URL: postgresql://user:pass@host:5432/db
   
✅ Ready for Backend Connection
   Just add URL to .env file
```

---

## 🐛 Troubleshooting

### Problem: Can't access PSQL terminal
**Solution**: 
- Try refreshing the page
- Or use TablePlus/DBeaver instead

### Problem: "Permission denied" errors
**Solution**:
- Make sure you're using the correct user credentials
- Check if database is fully provisioned (wait 2-3 minutes)

### Problem: Tables not creating
**Solution**:
- Copy SQL line by line instead of all at once
- Check for error messages
- Make sure you're connected to the right database

### Problem: Lost connection string
**Solution**:
- Go to Render dashboard
- Click on your database
- Scroll to "Connections" section
- Copy External Database URL again

---

## 💡 Pro Tips

1. **Bookmark Database Dashboard**
   - Keep the Render database page open in a tab
   - You'll need it when deploying backend

2. **Save Connection String in Password Manager**
   - It's a secret - don't commit to GitHub!
   - Store in LastPass, 1Password, or similar

3. **Test Before Deploying**
   - Always test database connection locally first
   - Run some test queries
   - Make sure shareholders table has 3 rows

4. **Regular Backups**
   - Render does automatic daily backups (Free plan)
   - You can also manually export data
   - In PSQL: `\copy monthly_records TO 'backup.csv' CSV HEADER`

---

## 📞 Need Help?

### Render Support:
- Documentation: https://render.com/docs/databases
- Community: https://community.render.com
- Status: https://status.render.com

### Common Questions:

**Q: Is the free tier really free forever?**
A: Yes! No credit card required.

**Q: What happens if I exceed 1GB storage?**
A: Render will email you. You can upgrade ($7/month for 10GB).

**Q: Can I connect from Ethiopia?**
A: Yes! The External Database URL works from anywhere.

**Q: Is my data safe?**
A: Yes! Render provides:
- Encrypted connections (SSL)
- Daily backups
- 99.99% uptime SLA

---

## 🎉 Success!

Your PostgreSQL database is ready! 🎊

**Next Steps:**
1. Update backend `.env` with database URL
2. Test backend locally
3. Deploy backend to Render
4. Deploy frontend to Vercel

See **DEPLOYMENT_GUIDE.md** for complete deployment instructions.

---

© 2026 Vehicle Accounting System
Database Setup Guide v1.0.0
