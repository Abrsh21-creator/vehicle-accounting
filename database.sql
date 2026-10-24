-- Vehicle Accounting Dashboard Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================================================
-- TABLE 1: Shareholders (Master Data)
-- ============================================================================
CREATE TABLE IF NOT EXISTS shareholders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_amharic VARCHAR(100),
  role VARCHAR(50),
  role_amharic VARCHAR(50),
  share_percentage DECIMAL(5, 2) NOT NULL CHECK (share_percentage >= 0 AND share_percentage <= 100),
  base_capital DECIMAL(15, 2) NOT NULL CHECK (base_capital >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert the three shareholders
INSERT INTO shareholders (name, name_amharic, role, role_amharic, share_percentage, base_capital)
VALUES 
  ('Amsalu', 'አምሳሉ', 'Assistant', 'እረዳት', 15.6, 920000),
  ('Smeneh', 'ስመኔህ', 'Driver', 'ሾፌር', 12.6, 741800),
  ('Kes Yeshalem', 'ቄስ የሻለም', 'Main Owner', 'ባለቤት', 71.8, 4218359)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TABLE 2: Monthly Records (Transaction Data)
-- ============================================================================
CREATE TABLE IF NOT EXISTS monthly_records (
  id SERIAL PRIMARY KEY,
  month_name VARCHAR(100) NOT NULL,
  
  -- Income and Expenses
  gross_income DECIMAL(15, 2) NOT NULL CHECK (gross_income >= 0),
  bank_installment DECIMAL(15, 2) DEFAULT 0 CHECK (bank_installment >= 0),
  misc_expenses DECIMAL(15, 2) DEFAULT 0 CHECK (misc_expenses >= 0),
  
  -- Amsalu Data
  amsalu_salary DECIMAL(15, 2) DEFAULT 0 CHECK (amsalu_salary >= 0),
  amsalu_equb DECIMAL(15, 2) DEFAULT 0 CHECK (amsalu_equb >= 0),
  amsalu_prev_balance DECIMAL(15, 2) DEFAULT 0,
  amsalu_net_payout DECIMAL(15, 2),
  
  -- Smeneh Data
  smeneh_salary DECIMAL(15, 2) DEFAULT 0 CHECK (smeneh_salary >= 0),
  smeneh_equb DECIMAL(15, 2) DEFAULT 0 CHECK (smeneh_equb >= 0),
  smeneh_prev_balance DECIMAL(15, 2) DEFAULT 0,
  smeneh_net_payout DECIMAL(15, 2),
  
  -- Kes Yeshalem Data
  kesyeshalem_prev_balance DECIMAL(15, 2) DEFAULT 0,
  kesyeshalem_net_payout DECIMAL(15, 2),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries (most recent first)
CREATE INDEX IF NOT EXISTS idx_monthly_records_created_at ON monthly_records(created_at DESC);

-- Create index for month name searches
CREATE INDEX IF NOT EXISTS idx_monthly_records_month_name ON monthly_records(month_name);

-- ============================================================================
-- TABLE 3: Users (Optional - For Authentication)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to monthly_records
CREATE TRIGGER update_monthly_records_updated_at 
  BEFORE UPDATE ON monthly_records 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to shareholders
CREATE TRIGGER update_shareholders_updated_at 
  BEFORE UPDATE ON shareholders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to users
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS (Useful queries)
-- ============================================================================

-- View: Recent monthly records with all details
CREATE OR REPLACE VIEW recent_records AS
SELECT 
  id,
  month_name,
  gross_income,
  bank_installment + misc_expenses as total_expenses,
  amsalu_net_payout,
  smeneh_net_payout,
  kesyeshalem_net_payout,
  created_at
FROM monthly_records
ORDER BY created_at DESC
LIMIT 12;

-- View: Financial summary statistics
CREATE OR REPLACE VIEW financial_summary AS
SELECT 
  COUNT(*) as total_months,
  COALESCE(SUM(gross_income), 0) as total_income,
  COALESCE(AVG(gross_income), 0) as average_income,
  COALESCE(MAX(gross_income), 0) as max_income,
  COALESCE(MIN(gross_income), 0) as min_income,
  COALESCE(SUM(amsalu_net_payout), 0) as amsalu_total,
  COALESCE(SUM(smeneh_net_payout), 0) as smeneh_total,
  COALESCE(SUM(kesyeshalem_net_payout), 0) as kesyeshalem_total
FROM monthly_records;

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Uncomment to insert sample monthly record
/*
INSERT INTO monthly_records (
  month_name, gross_income, bank_installment, misc_expenses,
  amsalu_salary, amsalu_equb, amsalu_prev_balance, amsalu_net_payout,
  smeneh_salary, smeneh_equb, smeneh_prev_balance, smeneh_net_payout,
  kesyeshalem_prev_balance, kesyeshalem_net_payout
) VALUES (
  'November 2026', 150000, 20000, 10000,
  15000, 2000, 0, 26572,
  18000, 2500, 0, 26462,
  0, 62466
);
*/

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check shareholders
SELECT * FROM shareholders;

-- Check recent records
SELECT * FROM recent_records;

-- Get financial summary
SELECT * FROM financial_summary;

-- Count all records
SELECT COUNT(*) FROM monthly_records;

-- ============================================================================
-- SECURITY (Enable Row Level Security - RLS)
-- ============================================================================

-- Enable RLS on tables (recommended for production)
ALTER TABLE shareholders ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access to all authenticated users
CREATE POLICY "Allow read access to authenticated users" ON monthly_records
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow insert/update/delete to authenticated users
CREATE POLICY "Allow full access to authenticated users" ON monthly_records
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Similar policies for shareholders
CREATE POLICY "Allow read shareholders" ON shareholders
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- BACKUP & MAINTENANCE
-- ============================================================================

-- To backup data (run from terminal):
-- pg_dump DATABASE_URL > backup.sql

-- To restore:
-- psql DATABASE_URL < backup.sql

-- ============================================================================
-- DONE! Your database is ready.
-- ============================================================================
