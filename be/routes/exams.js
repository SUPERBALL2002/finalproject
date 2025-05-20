const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - ดึงข้อสอบทั้งหมด พร้อมข้อมูล user และ lesson
router.get('/', (req, res) => {
  const { user_id, lesson_id } = req.query;

  let sql = `
    SELECT exam.*, user.Username, lesson.lesson_name
    FROM exam
    JOIN user ON exam.UserID = user.UserID
    JOIN lesson ON exam.lesson_ID = lesson.lesson_ID
    WHERE 1=1
  `;

  const params = [];

  if (user_id) {
    sql += ' AND exam.UserID = ?';
    params.push(user_id);
  }

  if (lesson_id) {
    sql += ' AND exam.lesson_ID = ?';
    params.push(lesson_id);
  }

  db.query(sql, params, (err, results) => {
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

  router.post('/addexam', (req, res) => {
  console.log("📨 POST /addexam called"); // <-- เพิ่ม log นี้ไว้เช็ค
  const { SubjectID, examscore, testat, UserID, lesson_ID } = req.body;

  const checkQuery = 
    `SELECT * FROM exam WHERE UserID = ? AND SubjectID = ? AND lesson_ID = ?`;

  db.query(checkQuery, [UserID, SubjectID, lesson_ID], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });

    if (results.length > 0) {
      return res.status(400).json({
        message: 'This exam already exists for this user, subject, and lesson.'
      });
    }

    const insertQuery = 
      `INSERT INTO exam (SubjectID, examscore, testat, UserID, lesson_ID)
       VALUES (?, ?, ?, ?, ?)`;

    db.query(insertQuery, [SubjectID, examscore, testat, UserID, lesson_ID], (err, result) => {
      if (err) return res.status(500).json({ error: 'Insert failed', details: err });

      res.status(201).json({
        message: 'Exam added successfully',
        examID: result.insertId
      });
    });
  });
});

  router.put('/update/:examID', (req, res) => {
  const { examID } = req.params;
  const { SubjectID, examscore, testat, UserID, lesson_ID } = req.body;

  // ตรวจสอบว่า examID นี้มีอยู่และข้อมูล UserID, SubjectID, lesson_ID ตรงกันหรือไม่
  const checkQuery = `
    SELECT * FROM exam 
    WHERE examID = ? AND UserID = ? AND SubjectID = ? AND lesson_ID = ?
  `;

  db.query(checkQuery, [examID, UserID, SubjectID, lesson_ID], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });

    if (results.length === 0) {
      return res.status(403).json({
        message: 'You can only update exams that match your UserID, SubjectID, and lesson_ID'
      });
    }

    // ถ้าตรงกัน → อัปเดตข้อมูลคะแนนและวันที่สอบ
    const updateQuery = `
      UPDATE exam 
      SET examscore = ?, testat = ?
      WHERE examID = ?
    `;

    db.query(updateQuery, [examscore, testat, examID], (err, result) => {
      if (err) return res.status(500).json({ error: 'Update failed', details: err });

      res.json({ message: 'Exam updated successfully' });
    });
  });
});

module.exports = router;