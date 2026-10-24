# Commands Reference
## የትዕዛዞች መመሪያ

Quick reference for all commands you'll need.

---

## 🚀 Essential Commands

### Start Development Server
```bash
npm run dev
```
**What it does**: Starts the app at http://localhost:5173  
**When to use**: Every time you want to use the dashboard  
**To stop**: Press `Ctrl+C` in the terminal

---

### Build for Production
```bash
npm run build
```
**What it does**: Creates optimized files in `dist` folder  
**When to use**: When you want standalone files to share  
**Output**: `dist/index.html` and assets

---

### Preview Production Build
```bash
npm run preview
```
**What it does**: Tests the production build locally  
**When to use**: After building, to verify it works  
**Access at**: http://localhost:4173

---

### Install Dependencies (One-time)
```bash
npm install
```
**What it does**: Installs all required packages  
**When to use**: First time setup, or after code changes  
**Takes**: 2-3 minutes

---

## 🔧 Advanced Commands

### Start with Custom Port
```bash
npm run dev -- --port 3000
```
**What it does**: Uses port 3000 instead of 5173  
**When to use**: If port 5173 is already in use

---

### Start with Network Access
```bash
npm run dev -- --host
```
**What it does**: Allows access from other devices on network  
**When to use**: Want to use on multiple computers  
**Access at**: http://[your-ip]:5173

---

### Check for Updates
```bash
npm outdated
```
**What it does**: Shows which packages have updates  
**When to use**: Periodically for maintenance

---

### Update Dependencies
```bash
npm update
```
**What it does**: Updates all packages to latest versions  
**When to use**: After checking outdated packages  
**Warning**: Test thoroughly after updating

---

## 📁 Navigation Commands

### Change to Project Directory
```bash
cd vehicle-accounting-dashboard
```

### Go Back One Level
```bash
cd ..
```

### List Files
```bash
dir          # Windows
ls           # Mac/Linux
```

### Show Current Directory
```bash
cd           # Windows (no arguments)
pwd          # Mac/Linux
```

---

## 🗂️ File Management

### Open in Code Editor
```bash
code .                    # VS Code
notepad src/App.jsx      # Notepad (Windows)
```

### View File Contents
```bash
type README.md           # Windows
cat README.md            # Mac/Linux
```

---

## 🌐 Browser Commands

### Open in Default Browser
```bash
start http://localhost:5173    # Windows
open http://localhost:5173     # Mac
xdg-open http://localhost:5173 # Linux
```

---

## 🔍 Diagnostic Commands

### Check Node Version
```bash
node --version
```
**Should be**: v16.0.0 or higher

### Check npm Version
```bash
npm --version
```
**Should be**: 8.0.0 or higher

### Check if Port is Available
```bash
netstat -ano | findstr :5173   # Windows
lsof -i :5173                  # Mac/Linux
```

---

## 🧹 Cleanup Commands

### Clear npm Cache
```bash
npm cache clean --force
```
**When to use**: If installation fails

### Remove node_modules
```bash
rmdir /s /q node_modules       # Windows
rm -rf node_modules            # Mac/Linux
```
**When to use**: Before fresh reinstall

### Fresh Install
```bash
rmdir /s /q node_modules       # Windows
del package-lock.json          # Windows
npm install
```

---

## 📦 Backup Commands

### Backup to ZIP (Windows)
```bash
tar -a -c -f vehicle-dashboard-backup.zip vehicle-accounting-dashboard
```

### Copy Project
```bash
xcopy vehicle-accounting-dashboard backup-folder /E /I   # Windows
cp -r vehicle-accounting-dashboard backup-folder         # Mac/Linux
```

---

## 🖨️ Browser Print Commands

While app is running, in browser:
```
Ctrl+P          # Open print dialog
Ctrl+S          # Save page
F12             # Open developer tools
Ctrl+Shift+I    # Open inspector
```

---

## 💾 Git Commands (Optional)

### Initialize Git Repository
```bash
git init
```

### Add Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Initial commit"
```

### Create Branch
```bash
git branch my-changes
git checkout my-changes
```

---

## 🚨 Emergency Commands

### Kill All Node Processes (if stuck)
```bash
taskkill /F /IM node.exe       # Windows
killall node                   # Mac/Linux
```

### Force Close Port 5173
```bash
# Find process using port
netstat -ano | findstr :5173

# Kill process (replace PID with actual number)
taskkill /PID [PID] /F
```

---

## 📊 Usage Statistics Commands

### Check Project Size
```bash
dir /s                         # Windows
du -sh .                       # Mac/Linux
```

### Count Lines of Code
```bash
# PowerShell
(Get-Content src/App.jsx).Length

# Linux/Mac
wc -l src/App.jsx
```

---

## 🎯 Quick Start Sequence

### First Time Setup
```bash
cd vehicle-accounting-dashboard
npm install
npm run dev
```

### Daily Usage
```bash
cd vehicle-accounting-dashboard
npm run dev
# Use the app
# Press Ctrl+C when done
```

### Creating Production Files
```bash
cd vehicle-accounting-dashboard
npm run build
# Files ready in 'dist' folder
```

---

## 🔐 Security Commands

### Audit Dependencies
```bash
npm audit
```
**What it does**: Checks for security vulnerabilities

### Fix Security Issues
```bash
npm audit fix
```
**What it does**: Automatically fixes known issues

---

## 📝 Documentation Commands

### Open Documentation
```bash
start README.md              # Windows
open README.md               # Mac
xdg-open README.md           # Linux
```

### Search Documentation
```bash
findstr /s /i "calculation" *.md     # Windows
grep -r "calculation" *.md           # Mac/Linux
```

---

## 🎓 Learning Commands

### View Package Info
```bash
npm info react
npm info vite
npm info tailwindcss
```

### List Installed Packages
```bash
npm list
npm list --depth=0           # Top-level only
```

---

## ⚙️ Configuration Commands

### View npm Configuration
```bash
npm config list
```

### Set Custom Configuration
```bash
npm config set <key> <value>
```

---

## 🌟 Pro Tips

### Command History
```bash
# Use UP arrow to repeat previous commands
# Use DOWN arrow to navigate command history
```

### Tab Completion
```bash
# Type first few letters and press TAB
npm run d[TAB]  # Completes to "npm run dev"
```

### Multiple Commands
```bash
# Run multiple commands in sequence
cd vehicle-accounting-dashboard && npm run dev
```

### Background Process (Advanced)
```bash
# Run in background (Linux/Mac)
npm run dev &

# Windows - use separate terminal window
start cmd /k npm run dev
```

---

## 🆘 Troubleshooting Commands

### Clear Terminal
```bash
cls              # Windows
clear            # Mac/Linux
```

### Check Environment
```bash
echo %PATH%      # Windows
echo $PATH       # Mac/Linux
```

### Verify Installation
```bash
where node       # Windows
which node       # Mac/Linux
```

---

## 📱 Mobile Development Commands

### Start with QR Code (if supported)
```bash
npm run dev -- --host --open
```

### Get Your IP Address
```bash
ipconfig                    # Windows
ifconfig                    # Mac/Linux
ip addr show                # Modern Linux
```

---

## 🔄 Update Commands

### Update npm
```bash
npm install -g npm@latest
```

### Update Node (use installer from nodejs.org)
```bash
node --version              # Check current version
# Download latest from https://nodejs.org
```

---

## ⏰ Scheduled Tasks (Advanced)

### Create Backup Script (Windows)
```batch
@echo off
cd C:\path\to\vehicle-accounting-dashboard
npm run build
tar -a -c -f backup-%date%.zip dist
```

### Run Monthly (Windows Task Scheduler)
```bash
schtasks /create /tn "Dashboard Backup" /tr "C:\path\to\backup.bat" /sc monthly
```

---

## 📊 Performance Commands

### Measure Build Time
```bash
npm run build -- --mode production
```

### Analyze Bundle Size
```bash
npm run build -- --mode production --analyze
```

---

## 🎯 Complete Workflow

### Daily Use
```bash
# Morning
cd vehicle-accounting-dashboard
npm run dev

# Work with the app in browser

# Evening
# Press Ctrl+C in terminal
```

### Monthly Accounting
```bash
# Start app
npm run dev

# 1. Enter month data
# 2. Review calculations
# 3. Save month
# 4. Print to PDF
# 5. Close app (Ctrl+C)
```

### Maintenance (Monthly)
```bash
# Check for updates
npm outdated

# Update if needed
npm update

# Run security check
npm audit

# Test
npm run dev
```

---

## ✅ Command Checklist

### Have you tried?
- [ ] `npm install` (first time only)
- [ ] `npm run dev` (to start app)
- [ ] `Ctrl+C` (to stop app)
- [ ] `npm run build` (for production files)
- [ ] `npm audit` (for security check)

---

## 📞 Need Help?

### Command not working?
1. Check you're in correct directory: `cd vehicle-accounting-dashboard`
2. Check Node is installed: `node --version`
3. Try fresh install: `npm install`
4. Check documentation: `type README.md` (Windows)

---

## 🎉 Most Important Commands

```bash
# These 3 commands are 95% of what you need:

cd vehicle-accounting-dashboard    # Navigate to project
npm run dev                        # Start the app
# Press Ctrl+C when done           # Stop the app
```

**That's all you need to know to use the dashboard daily!**

---

© 2026 Vehicle Accounting Dashboard  
Quick command reference for all users
