# Quick Start Guide
## የፈጣን መጀመሪያ መመሪያ

Get up and running with the Vehicle Accounting Dashboard in 5 minutes!

---

## 🚀 Installation (One-Time Setup)

### Option A: Already Installed
If dependencies are already installed (you see a `node_modules` folder), skip to **Running the App**.

### Option B: Fresh Installation
```bash
cd vehicle-accounting-dashboard
npm install
```

Wait for installation to complete (2-3 minutes).

---

## ▶️ Running the App

### Start Development Server
```bash
npm run dev
```

The app will open at: **http://localhost:5173**

Your browser should automatically open. If not, manually visit the URL above.

---

## 📝 First Time Usage

### Step 1: Enter a Month Name
```
Current Month: January 2024
```

### Step 2: Fill in General Financials
```
Monthly Gross Income:     150,000  (the total income for the month)
Bank Loan Installment:     20,000  (monthly bank payment)
Misc. Vehicle Expenses:    10,000  (maintenance, fuel, etc.)
```

### Step 3: Fill in Personnel Data

**Amsalu (Assistant):**
```
Monthly Salary:            15,000
Monthly Equb:               2,000
Previous Balance:               0  (first month, so it's zero)
```

**Smeneh (Driver):**
```
Monthly Salary:            18,000
Monthly Equb:               2,500
Previous Balance:               0  (first month, so it's zero)
```

**Kes Yeshalem (Owner):**
```
Previous Balance:               0  (first month, so it's zero)
```

### Step 4: View Results
As you type, results automatically update in the "Final Net Payouts" section:
- **Amsalu**: Will show net payout (green if positive, red if negative)
- **Smeneh**: Will show net payout  
- **Kes Yeshalem**: Will show net payout

### Step 5: Review Detailed Breakdown (Optional)
Click **"Show Breakdown"** button to see step-by-step calculations for each shareholder.

### Step 6: Save the Month
Click **"Save Month & Carry Over"** button:
- This saves the current month to history
- Automatically carries forward the net payouts to next month
- Resets input fields for the next month
- Advances the month name

---

## 🔄 Second Month and Beyond

After saving your first month:

1. **Previous Balances Auto-Populated**: The net payouts from last month are now in "Previous Balance" fields
2. **Enter New Month Data**: Fill in this month's income, expenses, salaries, and equb
3. **Review Results**: Check the calculations
4. **Save Again**: Click "Save Month & Carry Over"
5. **Repeat**: Continue for each subsequent month

---

## 🎯 Quick Tips

### Language Toggle
Click the language button in top-right to switch between:
- **አማ/Eng** - Shows both languages (default)
- **English** - English only
- **አማርኛ** - Amharic only

### View History
Click **"History"** button to see all saved months and their calculations.

### Print Records
Click **"Print"** button to print or save as PDF for physical records.

### Understanding Colors
- 🟢 **Green Numbers**: Profit/positive balance
- 🔴 **Red Numbers**: Debt/loss/negative balance

### Empty Fields
Empty input fields are treated as 0.00 ETB automatically.

---

## 📊 Understanding the Results

### Share Distribution
Each shareholder receives income proportionally:
- **Amsalu**: 15.6% of gross income
- **Smeneh**: 12.6% of gross income  
- **Kes Yeshalem**: 71.8% of gross income

### Expense Distribution
Shared expenses are split proportionally by the same percentages:
- Bank loan, maintenance, and salaries are shared expenses
- Each shareholder contributes their percentage
- Equb (personal savings) is deducted individually, not shared

### Net Calculation Formula
```
Net Payout = Income Share - Expense Share + Personal Salary - Equb + Previous Balance
```

*Note: Kes Yeshalem doesn't receive a salary, so it's just: Income Share - Expense Share + Previous Balance*

---

## 🛑 Common Issues

### Issue: "Cannot find module"
**Solution**: Run `npm install` in the project directory

### Issue: Port already in use
**Solution**: 
- Close other apps using port 5173
- Or use a different port: `npm run dev -- --port 3000`

### Issue: Calculations seem wrong
**Solution**: 
1. Click "Show Breakdown" to see step-by-step math
2. Verify all inputs are correct numbers
3. Check that you're not mixing up salary vs equb fields

### Issue: History disappeared
**Solution**: 
- History is stored in browser localStorage
- If browser cache was cleared, history is lost
- Always print important months to PDF as backup

---

## 📱 Mobile Usage

The dashboard works on mobile devices:
1. Open browser on your phone
2. Visit http://localhost:5173 (if on same network)
3. All features work on mobile
4. Recommended to use in landscape mode for better view

---

## 💾 Backing Up Your Data

### Method 1: Print to PDF (Recommended)
1. Click "Print" button
2. Select "Save as PDF" instead of printer
3. Save to your computer or cloud storage

### Method 2: History Export
1. Click "History" button
2. Manually copy important records
3. Store in separate document

### Method 3: Screenshots
- Take screenshots of monthly results
- Store in organized folders

---

## 🎓 Learning Resources

### Full Documentation
See `README.md` for complete technical documentation

### Calculation Examples
See `CALCULATION_EXAMPLES.md` for detailed mathematical examples and test cases

### Video Tutorial (if available)
[Link to tutorial video would go here]

---

## 📞 Need Help?

### Before Asking for Help, Try:
1. ✅ Read the error message carefully
2. ✅ Check "Show Breakdown" for calculation details
3. ✅ Verify all inputs are valid numbers
4. ✅ Check browser console for errors (F12 key)
5. ✅ Try refreshing the page

### Still Stuck?
Refer to the troubleshooting section in README.md or contact your system administrator.

---

## 🌟 Pro Tips

1. **Monthly Routine**: Set a specific day each month for accounting (e.g., 1st of month)
2. **Double Check**: Always review breakdown before saving
3. **Backup Often**: Print to PDF weekly or after each month
4. **Keep Records**: Store printed PDFs in chronological order
5. **Regular Verification**: Periodically verify share percentages still sum to 100%
6. **Document Changes**: If salaries or equb amounts change, note why in separate record

---

## ✅ Quick Checklist for Each Month

- [ ] Enter correct month name
- [ ] Input gross income (double-check bank deposits)
- [ ] Input bank installment (verify loan schedule)
- [ ] Input miscellaneous expenses (from receipts)
- [ ] Input Amsalu salary and equb
- [ ] Input Smeneh salary and equb
- [ ] Previous balances auto-filled from last month
- [ ] Review all three net payouts
- [ ] Click "Show Breakdown" to verify calculations
- [ ] Click "Save Month & Carry Over"
- [ ] Click "Print" and save to PDF
- [ ] Store PDF in safe location

---

**You're ready to go! Start the app with `npm run dev` and begin managing your vehicle finances.**

Happy Accounting! 🚗💰📊
