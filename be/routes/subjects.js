const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM subject', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // GET - ผู้ใช้ตาม ID
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM subject WHERE subjectID = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Subject not found' });
      res.json(results[0]);
    });
  });

module.exports = router;