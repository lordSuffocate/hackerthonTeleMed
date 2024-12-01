// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Admin viewing all appointments
router.get('/appointments', async (req, res) => {
  try {
    const [appointments] = await db.query('SELECT * FROM Appointments');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
