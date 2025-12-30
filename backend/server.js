const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://task-management-sys-woad.vercel.app'
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all origins in development, specific origins in production
    if (process.env.NODE_ENV === 'development' || allowedOrigins.indexOf(origin) !== -1 || process.env.FRONTEND_URL === '*') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement';

const mongooseOptions = {};

if (MONGODB_URI.includes('mongodb+srv://')) {
  console.log('🔗 Connecting to MongoDB Atlas (cloud)...');
} else {
  mongooseOptions.useNewUrlParser = true;
  mongooseOptions.useUnifiedTopology = true;
  console.log('🔗 Connecting to local MongoDB...');
}

mongoose.connect(MONGODB_URI, mongooseOptions)
.then(() => {
  console.log('✅ MongoDB Connected Successfully');
  console.log('✅ Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('❌ Full error:', err);
  console.error('');
  console.error('💡 Troubleshooting:');
  console.error('1. Check your MONGODB_URI in .env file');
  console.error('2. Verify MongoDB Atlas Network Access (should allow 0.0.0.0/0 or your IP)');
  console.error('3. Check username and password in connection string');
  console.error('4. Ensure connection string includes database name: .../taskmanagement?...');
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
