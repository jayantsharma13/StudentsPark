# NIT Hamirpur Placement Reviews - Backend API

A robust Node.js/Express API server for managing placement review data with MongoDB Atlas integration.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation & Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   The `.env` file is already configured with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://jayant01jan:admin123@cluster0.zj73jmq.mongodb.net/placement-reviews?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at: `http://localhost:5000`

## 📊 API Endpoints

### Reviews
- `GET /api/v1/reviews` - Get all reviews (paginated, filterable)
- `GET /api/v1/reviews/:id` - Get specific review
- `POST /api/v1/reviews` - Create new review
- `PUT /api/v1/reviews/:id` - Update review
- `DELETE /api/v1/reviews/:id` - Delete review
- `GET /api/v1/reviews/stats` - Get statistics

### Query Parameters
- **Pagination:** `page`, `limit`
- **Sorting:** `sortBy` (datePosted, rating, companyName), `sortOrder` (asc, desc)
- **Filtering:** `company`, `difficulty`, `rating`, `jobType`, `search`

## 🔧 Example API Usage

### Get All Reviews
```bash
curl http://localhost:5000/api/v1/reviews
```

### Get Reviews with Filtering
```bash
curl "http://localhost:5000/api/v1/reviews?company=Google&difficulty=Hard&page=1&limit=5"
```

### Create a New Review
```bash
curl -X POST http://localhost:5000/api/v1/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Microsoft",
    "jobRole": "Software Engineer",
    "location": "Hyderabad",
    "jobType": "Full-time",
    "experienceType": "Both",
    "rating": 5,
    "difficulty": "Medium",
    "processStages": ["Resume Screening", "Online Assessment", "Technical Interview"],
    "overallExperience": "Great experience overall!"
  }'
```

## 🛡️ Security Features

- **Rate Limiting:** 
  - General: 100 requests/15 minutes
  - Read operations: 200 requests/15 minutes
  - Create operations: 5 requests/hour
- **CORS Protection:** Configured for frontend URL
- **Helmet.js:** Security headers
- **Input Validation:** Mongoose schema validation
- **Error Handling:** Comprehensive error responses

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── reviewController.js  # Business logic for reviews
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   └── rateLimiter.js       # Rate limiting configuration
├── models/
│   └── Review.js            # Mongoose schema for reviews
├── routes/
│   └── reviews.js           # Review routes definition
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── server.js                # Main server file
```

## 🔍 Health Check

Visit `http://localhost:5000/health` to check if the API is running properly.

## 📝 Data Schema

The Review model includes:
- Basic info (company, role, location, job type)
- Experience details (OA, interviews, difficulty)
- Ratings and recommendations
- Anonymous student info (branch, graduation year)
- Timestamps and metadata

## 🚀 Deployment

For production deployment:

1. Update environment variables
2. Ensure MongoDB Atlas whitelist includes your server IP
3. Use `npm start` for production mode
4. Consider using PM2 or similar process manager

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Update documentation for new endpoints
4. Test thoroughly before deployment

## 📞 Support

For issues with the backend API, check:
1. MongoDB Atlas connection and credentials
2. Environment variables configuration
3. Network connectivity and firewall settings
4. Server logs for detailed error messages
