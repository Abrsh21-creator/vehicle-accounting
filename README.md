# Vehicle Accounting Backend API

Node.js + Express backend for the Vehicle Accounting Dashboard system.

---

## 🚀 Quick Start

### Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Run Server**:
   ```bash
   npm start      # Production mode
   npm run dev    # Development mode (auto-restart)
   ```

4. **Test API**:
   ```
   http://localhost:3001/api/health
   ```

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Shareholders
```
GET /api/shareholders
```
Get all shareholders (Amsalu, Smeneh, Kes Yeshalem).

### Monthly Records

**Get all records** (with pagination):
```
GET /api/records?limit=100&offset=0
```

**Get single record**:
```
GET /api/records/:id
```

**Create record**:
```
POST /api/records
Content-Type: application/json

{
  "monthName": "November 2026",
  "grossIncome": 150000,
  "bankInstallment": 20000,
  "miscExpenses": 10000,
  "amsaluSalary": 15000,
  "amsaluEqub": 2000,
  "amsaluPrevBalance": 0,
  "amsaluNetPayout": 26572,
  "smenehSalary": 18000,
  "smenehEqub": 2500,
  "smenehPrevBalance": 0,
  "smenehNetPayout": 26462,
  "kesyeshalemPrevBalance": 0,
  "kesyeshalemNetPayout": 62466
}
```

**Update record**:
```
PUT /api/records/:id
Content-Type: application/json

{... same as create ...}
```

**Delete record**:
```
DELETE /api/records/:id
```

### Statistics
```
GET /api/statistics
```
Get financial summary (totals, averages, etc.).

---

## 🗄️ Database

Uses PostgreSQL with these tables:
- `shareholders` - Master shareholder data
- `monthly_records` - Transaction records
- `users` - Authentication (optional)

See `database.sql` for complete schema.

---

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete deployment instructions.

**Quick Deploy to Render**:
1. Push code to GitHub
2. Connect Render to repo
3. Add environment variables
4. Deploy!

---

## 🔧 Environment Variables

```
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=3001
NODE_ENV=production
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

---

## 🔒 Security

- CORS configured for frontend URL only
- SQL injection prevention (parameterized queries)
- Environment variables for secrets
- Row Level Security on database
- HTTPS enforced in production

---

## 📞 Support

Issues? Check:
1. Database connection string correct
2. Environment variables set
3. Frontend CORS URL matches
4. Check server logs

---

© 2026 Vehicle Accounting Backend API
