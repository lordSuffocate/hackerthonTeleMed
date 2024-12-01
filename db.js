// db.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '981030',
  database: 'telemedicine_db'
});

// Export the pool
module.exports = pool.promise();
