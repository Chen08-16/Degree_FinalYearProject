const menuRoutes = require('../src/controller/menu')
const profileRoutes = require('../src/controller/profile')
const reservationRoutes = require('../src/controller/reservation')
const orderRoutes = require('../src/controller/order')

const mongoose = require('mongoose');

const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config();
const MONGO_URI = process.env.MONGO_URI

const app = express();
const PORT = 3000;


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS for your frontend
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

console.log(MONGO_URI)

mongoose.connect(MONGO_URI)
.then(async () => {
    console.log('Connected to MongoDB');
})
.catch((error) => console.error('MongoDB connection error:', error));

// Menu Routes
app.use('/api/menu', menuRoutes);

// Profile Routes
app.use('/api/profile', profileRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
// Serve static files (for uploaded images)
app.use('/uploads', express.static('uploads'));
app.use("/hello",(req,res)=>res.status(200).json({message:"yes"}))

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});




