import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import middleware
import { generalLimiter, createLimiter, readLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import reviewRoutes from './routes/reviews.js';

// Import database connection
import connectToDatabase from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectToDatabase().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting
app.use(generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudentsPark Placement Reviews API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/v1/reviews', reviewRoutes);

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to StudentsPark Placement Reviews API',
    version: '1.0.0',
    documentation: '/api/v1/reviews',
    endpoints: {
      reviews: {
        'GET /api/v1/reviews': 'Get all reviews (with pagination, filtering, sorting)',
        'GET /api/v1/reviews/:id': 'Get a specific review',
        'POST /api/v1/reviews': 'Create a new review',
        'PUT /api/v1/reviews/:id': 'Update a review',
        'DELETE /api/v1/reviews/:id': 'Delete a review',
        'GET /api/v1/reviews/stats': 'Get review statistics'
      }
    },
    queryParameters: {
      pagination: 'page, limit',
      sorting: 'sortBy (datePosted, rating, companyName), sortOrder (asc, desc)',
      filtering: 'company, difficulty, rating, jobType, search'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 StudentsPark Placement Reviews API Server Started!
  
📍 Server running on: http://localhost:${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
📊 Health Check: http://localhost:${PORT}/health
📚 API Documentation: http://localhost:${PORT}/

🔧 Available Endpoints:
   GET    /api/v1/reviews          - Get all reviews
   GET    /api/v1/reviews/:id      - Get specific review  
   POST   /api/v1/reviews          - Create new review
   PUT    /api/v1/reviews/:id      - Update review
   DELETE /api/v1/reviews/:id      - Delete review
   GET    /api/v1/reviews/stats    - Get statistics

🔒 Rate Limits Applied:
   - General: 100 requests/15 min
   - Read: 200 requests/15 min  
   - Create: 5 requests/hour

Happy coding! 🎓
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

export default app;
