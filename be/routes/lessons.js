const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM lesson', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // GET - ผู้ใช้ตาม ID
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM lesson WHERE lesson_ID = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Lesson not found' });
      res.json(results[0]);
    });
  });

  router.post('/lesson', async (req, res) => {
  const { lesson_name } = req.body;

  try {
    db.query('SELECT * FROM lesson WHERE lesson_name = ?', [lesson_name], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error checking lesson', error: err });
      if (results.length > 0) return res.status(400).json({ message: 'Lesson already exists' });

      db.query('INSERT INTO lesson (lesson_name) VALUES (?)', [lesson_name], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error inserting lesson', error: err });
        res.status(201).json({ message: 'Lesson added successfully', lessonId: result.insertId });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;