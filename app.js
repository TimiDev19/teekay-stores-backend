// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables from .env file

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Optional, if you need to parse URL-encoded data

// Import your routes
const checkoutRoutes = require('./Routes'); // Adjust this if your file has a different name or path

// Register your routes with a base path
app.use('/api', checkoutRoutes); // All routes in Routes.js will be prefixed with /api

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});