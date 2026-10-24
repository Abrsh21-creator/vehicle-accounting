import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://vehicle-accounting-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Vehicle Accounting API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all shareholders
app.get('/api/shareholders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shareholders ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching shareholders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch shareholders'
    });
  }
});

// Get all monthly records (with pagination)
app.get('/api/records', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    
    const result = await pool.query(
      'SELECT * FROM monthly_records ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    
    // Get total count
    const countResult = await pool.query('SELECT COUNT(*) FROM monthly_records');
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        limit,
        offset,
        hasMore: (offset + limit) < parseInt(countResult.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch records'
    });
  }
});

// Get a single monthly record by ID
app.get('/api/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM monthly_records WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch record'
    });
  }
});

// Create a new monthly record
app.post('/api/records', async (req, res) => {
  try {
    const {
      monthName,
      grossIncome,
      bankInstallment,
      miscExpenses,
      amsaluSalary,
      amsaluEqub,
      amsaluPrevBalance,
      amsaluNetPayout,
      smenehSalary,
      smenehEqub,
      smenehPrevBalance,
      smenehNetPayout,
      kesyeshalemPrevBalance,
      kesyeshalemNetPayout
    } = req.body;
    
    // Validation
    if (!monthName || grossIncome === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Month name and gross income are required'
      });
    }
    
    const result = await pool.query(
      `INSERT INTO monthly_records (
        month_name, gross_income, bank_installment, misc_expenses,
        amsalu_salary, amsalu_equb, amsalu_prev_balance, amsalu_net_payout,
        smeneh_salary, smeneh_equb, smeneh_prev_balance, smeneh_net_payout,
        kesyeshalem_prev_balance, kesyeshalem_net_payout
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        monthName, grossIncome, bankInstallment, miscExpenses,
        amsaluSalary, amsaluEqub, amsaluPrevBalance, amsaluNetPayout,
        smenehSalary, smenehEqub, smenehPrevBalance, smenehNetPayout,
        kesyeshalemPrevBalance, kesyeshalemNetPayout
      ]
    );
    
    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create record'
    });
  }
});

// Update a monthly record
app.put('/api/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      monthName,
      grossIncome,
      bankInstallment,
      miscExpenses,
      amsaluSalary,
      amsaluEqub,
      amsaluPrevBalance,
      amsaluNetPayout,
      smenehSalary,
      smenehEqub,
      smenehPrevBalance,
      smenehNetPayout,
      kesyeshalemPrevBalance,
      kesyeshalemNetPayout
    } = req.body;
    
    const result = await pool.query(
      `UPDATE monthly_records SET
        month_name = $1, gross_income = $2, bank_installment = $3, misc_expenses = $4,
        amsalu_salary = $5, amsalu_equb = $6, amsalu_prev_balance = $7, amsalu_net_payout = $8,
        smeneh_salary = $9, smeneh_equb = $10, smeneh_prev_balance = $11, smeneh_net_payout = $12,
        kesyeshalem_prev_balance = $13, kesyeshalem_net_payout = $14,
        updated_at = NOW()
      WHERE id = $15
      RETURNING *`,
      [
        monthName, grossIncome, bankInstallment, miscExpenses,
        amsaluSalary, amsaluEqub, amsaluPrevBalance, amsaluNetPayout,
        smenehSalary, smenehEqub, smenehPrevBalance, smenehNetPayout,
        kesyeshalemPrevBalance, kesyeshalemNetPayout, id
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Record updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update record'
    });
  }
});

// Delete a monthly record
app.delete('/api/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM monthly_records WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Record deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete record'
    });
  }
});

// Get statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_months,
        COALESCE(SUM(gross_income), 0) as total_income,
        COALESCE(AVG(gross_income), 0) as average_income,
        COALESCE(MAX(gross_income), 0) as max_income,
        COALESCE(SUM(amsalu_net_payout), 0) as amsalu_total,
        COALESCE(SUM(smeneh_net_payout), 0) as smeneh_total,
        COALESCE(SUM(kesyeshalem_net_payout), 0) as kesyeshalem_total
      FROM monthly_records
    `);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  pool.end(() => {
    console.log('Database pool closed');
    process.exit(0);
  });
});
