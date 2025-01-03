// add middlewares here related to projects
const express = require('express');
const app = express();

// Middleware 1: Logging Middleware
const logRequestDetails = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Call next() to pass control to the next middleware/handler
};

// Middleware 2: Authentication Middleware
const checkAuthentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (authHeader && authHeader === 'Bearer mysecrettoken') {
    next(); // The user is authenticated, so pass control to the next handler
  } else {
    res.status(403).send('Forbidden: You are not authorized to access this resource.');
  }
};

// Apply the Logging Middleware to all routes
app.use(logRequestDetails);

// Apply the Authentication Middleware to a specific route
app.get('/protected', checkAuthentication, (req, res) => {
  res.send('Welcome to the protected route!');
});

// A public route (no authentication required)
app.get('/', (req, res) => {
  res.send('Welcome to the public route!');
});

// Bring the port number from process.env.PORT or default to 9000
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
