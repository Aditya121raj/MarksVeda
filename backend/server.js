const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const requestRoutes = require('./routes/requestRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marksveda';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected - MarksVeda DB Ready'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/requests', requestRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('MarksVeda Backend Running 🚀');
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MarksVeda API Running 🚀'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MarksVeda Backend Server running on http://localhost:${PORT}`);
});