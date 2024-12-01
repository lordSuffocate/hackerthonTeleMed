// app.js
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./db');

// Middleware
app.use(express.json());

// Session management
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));
app.use('/appointments', require('./routes/appointments'));
app.use('/admin', require('./routes/admin'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
