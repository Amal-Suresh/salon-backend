const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const cors = require('cors');
const userRoute = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE','PUT','PATCH'], 
    credentials: true, 
}));


app.use('/api/user', userRoute);


connectDB(); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
