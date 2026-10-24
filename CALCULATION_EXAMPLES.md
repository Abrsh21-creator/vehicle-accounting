# Calculation Examples
## የሂሳብ ምሳሌዎች

This document provides detailed calculation examples to verify the accuracy of the Vehicle Accounting Dashboard.

---

## Example 1: Basic Monthly Income Distribution

### Inputs
- Monthly Gross Income: **100,000 ETB**
- Bank Installment: **0 ETB**
- Misc Expenses: **0 ETB**
- All Salaries: **0 ETB**
- All Equb: **0 ETB**
- All Previous Balances: **0 ETB**

### Expected Results

#### Step 1: Gross Income Share Distribution
```
Amsalu (15.6%):     100,000 × 0.156 = 15,600.00 ETB
Smeneh (12.6%):     100,000 × 0.126 = 12,600.00 ETB
Kes Yeshalem (71.8%): 100,000 × 0.718 = 71,800.00 ETB
```

#### Step 2: Shared Expense Pool
```
Total Shared Expenses = 0 + 0 + 0 + 0 = 0 ETB
```

#### Step 3: Expense Distribution (0% of expenses)
```
Amsalu Expense:     0 × 0.156 = 0.00 ETB
Smeneh Expense:     0 × 0.126 = 0.00 ETB
Kes Yeshalem Expense: 0 × 0.718 = 0.00 ETB
```

#### Step 4: Final Net Payouts
```
Amsalu Net:     15,600 - 0 + 0 - 0 + 0 = 15,600.00 ETB ✓
Smeneh Net:     12,600 - 0 + 0 - 0 + 0 = 12,600.00 ETB ✓
Kes Yeshalem Net: 71,800 - 0 + 0 = 71,800.00 ETB ✓
```

#### Verification
```
Total Net Payout: 15,600 + 12,600 + 71,800 = 100,000 ETB
Expected Total: 100,000 - 0 = 100,000 ETB
Balance Check: 100,000 = 100,000 ✓ BALANCED
```

---

## Example 2: With Bank Loan and Expenses

### Inputs
- Monthly Gross Income: **150,000 ETB**
- Bank Installment: **20,000 ETB**
- Misc Expenses: **10,000 ETB**
- Amsalu Salary: **15,000 ETB**
- Amsalu Equb: **2,000 ETB**
- Smeneh Salary: **18,000 ETB**
- Smeneh Equb: **2,500 ETB**
- All Previous Balances: **0 ETB**

### Expected Results

#### Step 1: Gross Income Share Distribution
```
Amsalu (15.6%):     150,000 × 0.156 = 23,400.00 ETB
Smeneh (12.6%):     150,000 × 0.126 = 18,900.00 ETB
Kes Yeshalem (71.8%): 150,000 × 0.718 = 107,700.00 ETB
```

#### Step 2: Shared Expense Pool
```
Bank Installment:    20,000 ETB
Misc Expenses:       10,000 ETB
Amsalu Salary:       15,000 ETB
Smeneh Salary:       18,000 ETB
─────────────────────────────
Total Shared Expenses: 63,000 ETB
```

#### Step 3: Expense Distribution by Share Percentage
```
Amsalu Expense (15.6%):     63,000 × 0.156 = 9,828.00 ETB
Smeneh Expense (12.6%):     63,000 × 0.126 = 7,938.00 ETB
Kes Yeshalem Expense (71.8%): 63,000 × 0.718 = 45,234.00 ETB
```

#### Step 4: Final Net Payouts

**Amsalu:**
```
Gross Share:           +23,400.00 ETB
Expense Contribution:   -9,828.00 ETB
Salary Received:       +15,000.00 ETB
Equb Deduction:         -2,000.00 ETB
Previous Balance:           +0.00 ETB
─────────────────────────────────────
FINAL NET:             26,572.00 ETB ✓
```

**Smeneh:**
```
Gross Share:           +18,900.00 ETB
Expense Contribution:   -7,938.00 ETB
Salary Received:       +18,000.00 ETB
Equb Deduction:         -2,500.00 ETB
Previous Balance:           +0.00 ETB
─────────────────────────────────────
FINAL NET:             26,462.00 ETB ✓
```

**Kes Yeshalem:**
```
Gross Share:          +107,700.00 ETB
Expense Contribution:  -45,234.00 ETB
Previous Balance:           +0.00 ETB
─────────────────────────────────────
FINAL NET:             62,466.00 ETB ✓
```

#### Verification
```
Total Net Payout: 26,572 + 26,462 + 62,466 = 115,500 ETB
Actual Expenses: 20,000 + 10,000 + 2,000 + 2,500 = 34,500 ETB
Expected Total: 150,000 - 34,500 = 115,500 ETB
Balance Check: 115,500 = 115,500 ✓ BALANCED
```

---

## Example 3: With Previous Balances (Carryover)

### Inputs
- Monthly Gross Income: **120,000 ETB**
- Bank Installment: **15,000 ETB**
- Misc Expenses: **8,000 ETB**
- Amsalu Salary: **12,000 ETB**
- Amsalu Equb: **1,500 ETB**
- Amsalu Previous Balance: **5,000 ETB** (from last month)
- Smeneh Salary: **15,000 ETB**
- Smeneh Equb: **2,000 ETB**
- Smeneh Previous Balance: **-3,000 ETB** (debt from last month)
- Kes Yeshalem Previous Balance: **10,000 ETB** (from last month)

### Expected Results

#### Step 1: Gross Income Share Distribution
```
Amsalu (15.6%):     120,000 × 0.156 = 18,720.00 ETB
Smeneh (12.6%):     120,000 × 0.126 = 15,120.00 ETB
Kes Yeshalem (71.8%): 120,000 × 0.718 = 86,160.00 ETB
```

#### Step 2: Shared Expense Pool
```
Bank Installment:    15,000 ETB
Misc Expenses:        8,000 ETB
Amsalu Salary:       12,000 ETB
Smeneh Salary:       15,000 ETB
─────────────────────────────
Total Shared Expenses: 50,000 ETB
```

#### Step 3: Expense Distribution
```
Amsalu Expense (15.6%):     50,000 × 0.156 = 7,800.00 ETB
Smeneh Expense (12.6%):     50,000 × 0.126 = 6,300.00 ETB
Kes Yeshalem Expense (71.8%): 50,000 × 0.718 = 35,900.00 ETB
```

#### Step 4: Final Net Payouts

**Amsalu:**
```
Gross Share:           +18,720.00 ETB
Expense Contribution:   -7,800.00 ETB
Salary Received:       +12,000.00 ETB
Equb Deduction:         -1,500.00 ETB
Previous Balance:       +5,000.00 ETB (carryover from last month)
─────────────────────────────────────
FINAL NET:             26,420.00 ETB ✓
```

**Smeneh:**
```
Gross Share:           +15,120.00 ETB
Expense Contribution:   -6,300.00 ETB
Salary Received:       +15,000.00 ETB
Equb Deduction:         -2,000.00 ETB
Previous Balance:       -3,000.00 ETB (debt from last month)
─────────────────────────────────────
FINAL NET:             18,820.00 ETB ✓
```

**Kes Yeshalem:**
```
Gross Share:          +86,160.00 ETB
Expense Contribution:  -35,900.00 ETB
Previous Balance:      +10,000.00 ETB (carryover from last month)
─────────────────────────────────────
FINAL NET:             60,260.00 ETB ✓
```

#### Verification
```
Previous Balances Total: 5,000 + (-3,000) + 10,000 = 12,000 ETB
Total Net Payout: 26,420 + 18,820 + 60,260 = 105,500 ETB
Actual Expenses: 15,000 + 8,000 + 1,500 + 2,000 = 26,500 ETB
Expected Total: 120,000 - 26,500 + 12,000 = 105,500 ETB
Balance Check: 105,500 = 105,500 ✓ BALANCED
```

---

## Example 4: Loss Scenario (High Expenses, Low Income)

### Inputs
- Monthly Gross Income: **50,000 ETB**
- Bank Installment: **20,000 ETB**
- Misc Expenses: **15,000 ETB**
- Amsalu Salary: **12,000 ETB**
- Amsalu Equb: **1,000 ETB**
- Smeneh Salary: **15,000 ETB**
- Smeneh Equb: **1,000 ETB**
- All Previous Balances: **0 ETB**

### Expected Results

#### Step 1: Gross Income Share Distribution
```
Amsalu (15.6%):     50,000 × 0.156 = 7,800.00 ETB
Smeneh (12.6%):     50,000 × 0.126 = 6,300.00 ETB
Kes Yeshalem (71.8%): 50,000 × 0.718 = 35,900.00 ETB
```

#### Step 2: Shared Expense Pool
```
Bank Installment:    20,000 ETB
Misc Expenses:       15,000 ETB
Amsalu Salary:       12,000 ETB
Smeneh Salary:       15,000 ETB
─────────────────────────────
Total Shared Expenses: 62,000 ETB
```

#### Step 3: Expense Distribution
```
Amsalu Expense (15.6%):     62,000 × 0.156 = 9,672.00 ETB
Smeneh Expense (12.6%):     62,000 × 0.126 = 7,812.00 ETB
Kes Yeshalem Expense (71.8%): 62,000 × 0.718 = 44,516.00 ETB
```

#### Step 4: Final Net Payouts

**Amsalu:**
```
Gross Share:           +7,800.00 ETB
Expense Contribution:  -9,672.00 ETB
Salary Received:      +12,000.00 ETB
Equb Deduction:        -1,000.00 ETB
Previous Balance:          +0.00 ETB
─────────────────────────────────────
FINAL NET:             9,128.00 ETB ✓
```

**Smeneh:**
```
Gross Share:           +6,300.00 ETB
Expense Contribution:  -7,812.00 ETB
Salary Received:      +15,000.00 ETB
Equb Deduction:        -1,000.00 ETB
Previous Balance:          +0.00 ETB
─────────────────────────────────────
FINAL NET:            12,488.00 ETB ✓
```

**Kes Yeshalem:**
```
Gross Share:          +35,900.00 ETB
Expense Contribution: -44,516.00 ETB
Previous Balance:          +0.00 ETB
─────────────────────────────────────
FINAL NET:            -8,616.00 ETB ✗ (LOSS/DEBT)
```

#### Verification
```
Total Net Payout: 9,128 + 12,488 + (-8,616) = 13,000 ETB
Actual Expenses: 20,000 + 15,000 + 1,000 + 1,000 = 37,000 ETB
Expected Total: 50,000 - 37,000 = 13,000 ETB
Balance Check: 13,000 = 13,000 ✓ BALANCED

Note: Kes Yeshalem has a LOSS of 8,616 ETB this month (shown in red)
This amount will be carried forward as -8,616 ETB to next month's previous balance.
```

---

## Verification Rules

### Mathematical Balance Check
The system verifies that:
```
Total Net Payout = Gross Income - (Bank + Misc Expenses + All Equb)
```

If this equation doesn't balance (within 0.01 ETB margin for rounding), the system displays a warning.

### Share Percentage Validation
```
Amsalu % + Smeneh % + Kes Yeshalem % = 15.6% + 12.6% + 71.8% = 100.0% ✓
```

### Expense Distribution Rule
Shared expenses (bank, misc, salaries) are ALWAYS distributed by share percentage, ensuring:
```
Amsalu Contribution + Smeneh Contribution + Kes Yeshalem Contribution = Total Shared Expenses
```

---

## Edge Cases Handled

1. **Empty Inputs**: Treated as 0.00 ETB
2. **Negative Previous Balances**: Properly carried forward as debts
3. **Very Large Numbers**: Handled with precision up to 2 decimal places
4. **Zero Income with Expenses**: Results in negative net payouts (debts)
5. **Salary Greater Than Share**: Workers can still receive positive net (due to salary)
6. **Rounding Differences**: Verified within 0.01 ETB tolerance

---

## Testing Checklist

Use these examples to manually test the dashboard:

- [ ] Example 1: Basic income distribution (no expenses)
- [ ] Example 2: Standard month with all expenses
- [ ] Example 3: Month with previous balance carryover
- [ ] Example 4: Loss scenario with negative results
- [ ] Verify all calculations match expected results
- [ ] Check that red/green colors display correctly
- [ ] Confirm detailed breakdown matches step-by-step calculations
- [ ] Test "Save & Carry Over" functionality
- [ ] Verify history stores correctly
- [ ] Test print layout

---

**All examples verified for mathematical accuracy on October 24, 2026**
