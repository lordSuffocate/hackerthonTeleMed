// routes/patients.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Register a new patient
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.query(
      'INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address]
    );
    res.status(201).json({ message: 'Patient registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Patient login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM Patients WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const patient = rows[0];
    const match = await bcrypt.compare(password, patient.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.patientId = patient.id;
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
