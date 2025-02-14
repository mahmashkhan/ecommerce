const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors')
const adminRoutes = require('./src/index');
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// OR Allow Specific Origins (Safer)
app.use(
  cors({
    origin: 'http://localhost:3001', // Allow requests from React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'.yellow))
  .catch((err) => console.error('MongoDB connection error:'.red, err));

// Admin Routes
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.blue));
