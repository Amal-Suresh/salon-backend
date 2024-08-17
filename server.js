const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the connection function
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE','PUT','PATCH'], // Allow specific HTTP methods
    credentials: true, // Allow cookies and authentication headers
}));



// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
connectDB(); // Call the connection function from db.js

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
