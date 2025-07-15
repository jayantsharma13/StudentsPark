# 🚀 NIT Hamirpur Placement Reviews - Complete Setup Guide

## 🎯 Quick Start Instructions

### Step 1: Start the Backend Server

1. **Open PowerShell in the project root directory:**
   ```powershell
   cd c:\Users\91941\place-review-client\place-review-client
   ```

2. **Navigate to backend and install dependencies:**
   ```powershell
   cd backend
   npm install
   ```

3. **Start the backend server:**
   ```powershell
   npm run dev
   ```
   
   ✅ You should see: "Server running on: http://localhost:5000"

### Step 2: Start the Frontend (In a new PowerShell window)

1. **Open a new PowerShell window and navigate to project root:**
   ```powershell
   cd c:\Users\91941\place-review-client\place-review-client
   ```

2. **Install frontend dependencies (if not already done):**
   ```powershell
   npm install
   ```

3. **Start the frontend development server:**
   ```powershell
   npm run dev
   ```
   
   ✅ You should see: "Local: http://localhost:5173"

### Step 3: Test the Application

1. **Visit:** http://localhost:5173
2. **Backend API:** http://localhost:5000
3. **Health Check:** http://localhost:5000/health

## 🔧 What Was Created

### Backend Features:
- **Full REST API** with MongoDB Atlas integration
- **CRUD operations** for placement reviews
- **Advanced filtering** and pagination
- **Rate limiting** and security middleware
- **Comprehensive error handling**
- **Review statistics endpoint**

### API Endpoints:
- `GET /api/v1/reviews` - Get all reviews
- `GET /api/v1/reviews/:id` - Get specific review
- `POST /api/v1/reviews` - Create new review
- `PUT /api/v1/reviews/:id` - Update review
- `DELETE /api/v1/reviews/:id` - Delete review
- `GET /api/v1/reviews/stats` - Get statistics

### Frontend Integration:
- **Smart API service** with automatic fallback to mock data
- **Real-time data** from MongoDB when backend is available
- **Offline functionality** with mock data when backend is unavailable
- **Seamless user experience** regardless of backend status

## 📊 Database Connection

Your MongoDB Atlas connection is configured with:
```
mongodb+srv://jayant01jan:admin123@cluster0.zj73jmq.mongodb.net/placement-reviews
```

## 🚀 Quick Test Commands

### Test Backend Directly:
```bash
# Get all reviews
curl http://localhost:5000/api/v1/reviews

# Health check
curl http://localhost:5000/health

# Create a new review
curl -X POST http://localhost:5000/api/v1/reviews \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Test Company","jobRole":"Developer","location":"Test City","jobType":"Full-time","experienceType":"Both","rating":4}'
```

## 🔒 Security Features

- **Rate Limiting:** 100 requests/15 min (general), 5 reviews/hour (creation)
- **CORS Protection:** Only allows requests from frontend
- **Input Validation:** Comprehensive schema validation
- **Error Handling:** Secure error responses

## 📁 Project Structure

```
backend/
├── config/database.js       # MongoDB connection
├── controllers/            # Business logic
├── middleware/            # Security & error handling
├── models/               # Data schemas
├── routes/               # API routes
├── .env                  # Environment variables
└── server.js            # Main server file

src/
├── services/apiService.ts   # API communication
├── data/mockData.ts        # Fallback data
└── components/            # React components
```

## 🎉 Success!

You now have a complete full-stack application with:

✅ **MongoDB Atlas Database** - Cloud storage for all reviews
✅ **Express.js Backend API** - Robust server with all CRUD operations
✅ **React Frontend** - Beautiful Netflix-themed UI
✅ **Smart Data Service** - Automatic API/fallback switching
✅ **NIT Hamirpur Branding** - College-specific platform
✅ **Production Ready** - Security, rate limiting, error handling

## 🆘 Troubleshooting

**Backend won't start?**
- Check if MongoDB URI is correct in `backend/.env`
- Run `node test-connection.js` to test database connection

**Frontend showing errors?**
- Make sure backend is running on port 5000
- Check browser console for API errors

**Database issues?**
- Verify MongoDB Atlas cluster is running
- Check if IP address is whitelisted (0.0.0.0/0 for development)

Happy coding! 🎓✨
