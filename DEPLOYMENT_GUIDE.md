# 🚀 Complete Deployment Guide
## Deploy Vehicle Accounting System to Production

**Stack**: PostgreSQL (Render) + Node.js Backend (Render) + React Frontend (Vercel)

---

## ✅ Prerequisites

- [ ] GitHub account
- [ ] Render account (render.com)
- [ ] Vercel account (vercel.com)
- [ ] Git installed on your computer

---

## 📦 STEP 1: Setup PostgreSQL Database on Render

### 1.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Verify your email

### 1.2 Create PostgreSQL Database
1. Click "New +" button → "PostgreSQL"
2. Fill in details:
   ```
   Name: vehicle-accounting-db
   Database: vehicle_accounting
   User: (auto-generated)
   Region: Frankfurt (closest to Ethiopia)
   PostgreSQL Version: 16 (latest)
   Plan: Free
   ```
3. Click "Create Database"
4. Wait 1-2 minutes for provisioning

### 1.3 Get Connection String
1. Once created, go to database dashboard
2. Scroll down to "Connections"
3. Copy "External Database URL" - looks like:
   ```
   postgresql://user:password@host:5432/database
   ```
4. **Save this somewhere safe!**

### 1.4 Create Tables
1. In database dashboard, click "Connect" button
2. Click "PSQL Command" (opens terminal)
3. Copy ALL content from `database.sql` file
4. Paste into terminal and press Enter
5. You should see:
   ```
   CREATE TABLE
   INSERT 0 3
   ...
   ```
6. Verify:
   ```sql
   SELECT * FROM shareholders;
   ```
   Should show 3 shareholders (Amsalu, Smeneh, Kes Yeshalem)

---

## 🔧 STEP 2: Deploy Backend to Render

### 2.1 Prepare Backend Code
1. Open terminal in `vehicle-accounting-backend` folder
2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env`:
   ```
   DATABASE_URL=postgresql://... (paste your Render database URL)
   PORT=3001
   NODE_ENV=development
   JWT_SECRET=change-this-to-random-string-123456789
   FRONTEND_URL=http://localhost:5173
   ```

### 2.2 Test Locally (Optional but Recommended)
```bash
# Install dependencies
npm install

# Start server
npm start
```

Visit http://localhost:3001/api/health - should see:
```json
{
  "status": "OK",
  "message": "Vehicle Accounting API is running"
}
```

Press Ctrl+C to stop.

### 2.3 Push to GitHub
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend commit"

# Create repo on GitHub:
# Go to https://github.com/new
# Repository name: vehicle-accounting-backend
# Public or Private (your choice)
# Don't initialize with README (we already have code)
# Click "Create repository"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vehicle-accounting-backend.git

# Push
git branch -M main
git push -u origin main
```

### 2.4 Deploy on Render
1. Go to Render dashboard
2. Click "New +" → "Web Service"
3. Click "Connect account" (if not connected)
4. Find and select `vehicle-accounting-backend`
5. Configure:
   ```
   Name: vehicle-accounting-api
   Environment: Node
   Region: Frankfurt (same as database)
   Branch: main
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```
6. Click "Advanced" → "Add Environment Variable"
7. Add these variables:
   ```
   DATABASE_URL = [paste your database External URL]
   NODE_ENV = production
   JWT_SECRET = [same random string from local .env]
   FRONTEND_URL = https://YOUR-APP.vercel.app
   ```
   (We'll update FRONTEND_URL later with actual Vercel URL)

8. Click "Create Web Service"
9. Wait 2-3 minutes for deployment
10. Once deployed, you'll get a URL like:
    ```
    https://vehicle-accounting-api.onrender.com
    ```
11. Test it:
    ```
    https://vehicle-accounting-api.onrender.com/api/health
    ```
    Should return success message ✅

---

## 💻 STEP 3: Deploy Frontend to Vercel

### 3.1 Prepare Frontend Code
1. Open terminal in `vehicle-accounting-dashboard` folder
2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
3. For local testing, keep it as:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

### 3.2 Test Locally (Optional)
```bash
# Install dependencies (if not done)
npm install

# Start dev server
npm run dev
```

Should open at http://localhost:5173

### 3.3 Push to GitHub
```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial frontend commit"

# Create repo on GitHub:
# Go to https://github.com/new
# Repository name: vehicle-accounting-dashboard
# Public or Private
# Click "Create repository"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/vehicle-accounting-dashboard.git

# Push
git branch -M main
git push -u origin main
```

### 3.4 Deploy on Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Find and import `vehicle-accounting-dashboard`
5. Configure:
   ```
   Framework Preset: Vite (auto-detected)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
6. Click "Environment Variables"
7. Add variable:
   ```
   Key: VITE_API_URL
   Value: https://vehicle-accounting-api.onrender.com/api
   ```
   (Use your actual Render backend URL)

8. Click "Deploy"
9. Wait 1-2 minutes
10. You'll get a URL like:
    ```
    https://vehicle-accounting-dashboard.vercel.app
    ```

---

## 🔗 STEP 4: Connect Everything

### 4.1 Update Backend CORS
1. Go to Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL = https://vehicle-accounting-dashboard.vercel.app
   ```
   (Use your actual Vercel URL)
5. Service will auto-redeploy

### 4.2 Test Complete System
1. Visit your Vercel URL
2. Enter monthly data
3. Click "Save Month & Carry Over"
4. Refresh page - data should persist!
5. Check historical archive table

---

## ✅ Verification Checklist

- [ ] Database created on Render
- [ ] Tables created (shareholders, monthly_records)
- [ ] Backend deployed to Render
- [ ] Backend health check works
- [ ] Frontend deployed to Vercel
- [ ] Frontend can access backend API
- [ ] Can save monthly records
- [ ] Can view historical data
- [ ] Data persists after refresh
- [ ] Can delete records

---

## 🎯 Your Live URLs

After deployment, save these:

```
Frontend: https://vehicle-accounting-dashboard.vercel.app
Backend API: https://vehicle-accounting-api.onrender.com/api
Database: [Render PostgreSQL connection string]

GitHub Repos:
- Frontend: https://github.com/YOUR_USERNAME/vehicle-accounting-dashboard
- Backend: https://github.com/YOUR_USERNAME/vehicle-accounting-backend
```

---

## 🔄 Making Updates

### Update Frontend:
```bash
cd vehicle-accounting-dashboard
# Make changes
git add .
git commit -m "Update message"
git push

# Vercel auto-deploys! ✅
```

### Update Backend:
```bash
cd vehicle-accounting-backend
# Make changes
git add .
git commit -m "Update message"
git push

# Render auto-deploys! ✅
```

---

## 🐛 Troubleshooting

### Backend shows "Service Unavailable"
- **Cause**: Free tier backend sleeps after 15min inactivity
- **Solution**: Wait 30-60 seconds, it will wake up automatically

### Frontend can't connect to backend
- **Check**: CORS settings in backend
- **Check**: VITE_API_URL in Vercel environment variables
- **Check**: Backend is running (visit /api/health)

### Database connection error
- **Check**: DATABASE_URL is correct in Render backend environment
- **Check**: Database is not suspended (check Render dashboard)

### Data not saving
- **Check**: Browser console for errors (F12)
- **Check**: Network tab shows API calls
- **Check**: Backend logs in Render dashboard

---

## 💰 Cost Monitoring

### Current Setup: $0/month

**Free Tier Limits:**
- PostgreSQL: 500MB storage, 1GB RAM
- Backend: Sleeps after 15min, limited to 750 hours/month
- Frontend: Unlimited with 100GB bandwidth

**When to Upgrade:**
- Database > 500MB: $7/month for 1GB
- Need always-on backend: $7/month
- Need custom domain: Included in free tier!

---

## 🔐 Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Use Render/Vercel dashboards for secrets

2. **Database**:
   - Use Row Level Security (already configured)
   - Regular backups (Render does daily backups automatically)

3. **API**:
   - Add authentication if needed (JWT ready in code)
   - Rate limiting (can add later)

---

## 📞 Support

### Official Documentation:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- PostgreSQL: https://www.postgresql.org/docs/

### Community:
- Render Community: https://community.render.com
- Vercel Discussions: https://github.com/vercel/vercel/discussions

---

## 🎉 You're Live!

Your Vehicle Accounting Dashboard is now accessible from anywhere in the world!

**Share the URL** with your partners:
- Amsalu can check from his phone
- Smeneh can check from his phone
- Kes Yeshalem can check from anywhere

**All data is safe** in the cloud database! 🚀

---

© 2026 Vehicle Accounting Dashboard
Production Deployment Guide v1.0.0
