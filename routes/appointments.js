// routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create an appointment
router.post('/book', async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
      [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']
    );
    res.status(201).json({ message: 'Appointment booked successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get appointments by patient
router.get('/patient/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [appointments] = await db.query('SELECT * FROM Appointments WHERE patient_id = ?', [id]);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
