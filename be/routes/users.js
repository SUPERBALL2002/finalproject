const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // ✅ เพิ่มการเรียกใช้ bcrypt
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


// GET - ผู้ใช้ทั้งหมด
router.get('/', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET - ผู้ใช้ตาม ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM User WHERE UserID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]); // ต้องส่ง results[0] ไม่ใช่ results
  });
});
// PUT - แก้ไขผู้ใช้
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Username, FirstName, Lastname, Address, date_of_birth, email, phone_number } = req.body;
  const query = `
    UPDATE User 
    SET Username=?, FirstName=?, Lastname=?, Address=?, date_of_birth=?, email=?, phone_number=?
    WHERE UserID=?
  `;
  db.query(query, [Username, FirstName, Lastname, Address, date_of_birth, email, phone_number, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated' });
  });
});


// ✅ REGISTER - สมัครสมาชิก
router.post('/register', async (req, res) => {
  const { Username, Password, FirstName, Lastname, Address, date_of_birth, email, phone_number } = req.body;

  try {
    db.query('SELECT * FROM User WHERE Username = ? OR email = ?', [Username, email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Error checking user', error: err });
      if (results.length > 0) return res.status(400).json({ message: 'Username or Email already exists' });

      const hashedPassword = await bcrypt.hash(Password, 10);

      db.query(
        'INSERT INTO User (Username, Password, FirstName, Lastname, Address, date_of_birth, email, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [Username, hashedPassword, FirstName, Lastname, Address, date_of_birth, email, phone_number],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Error inserting user', error: err });
          res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

const secretKey = '1e8737391f566ccdf6311d25d32e162df21947b58cf098e6d67eb1c0f61573ceb22ae81d7444722e4ff2a8b4e355e9fa463e150db49a81976329861786e9d277';
router.post('/login', (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ message: 'กรุณาระบุ Username และ Password' });
  }

  db.query('SELECT * FROM User WHERE Username = ?', [Username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'ไม่พบผู้ใช้งานนี้' });
    }

    const user = results[0];

    // เปรียบเทียบรหัสผ่าน
    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }

    // สร้าง JWT
    const token = jwt.sign(
      {
        userID: user.UserID,
        username: user.Username,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      userID: user.UserID // ส่งกลับไป
    });
  });
});

//resetpass
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).send('Email not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expire = Date.now() + 3600000; // 1 ชั่วโมง

    await db.query('UPDATE user SET reset_token = ?, reset_token_expire = ? WHERE email = ?', [token, expire, email]);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click to reset your password: http://localhost:3001/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        res.send('Check your email for reset link');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM User WHERE ResetToken = ? AND ResetTokenExpire > ?',
      [token, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(404).send('Invalid or expired token');
    }

    res.send(`<form method="POST" action="/reset-password">
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="password" required placeholder="New Password" />
      <input type="submit" value="Reset Password" />
    </form>`);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM User WHERE ResetToken = ? AND ResetTokenExpire > ?',
      [token, Date.now()]
    );

    if (rows.length === 0) {
      return res.status(404).send('Invalid or expired token');
    }

    const userId = rows[0].UserID;

    await db.query(
      'UPDATE User SET Password = ?, ResetToken = NULL, ResetTokenExpire = NULL WHERE UserID = ?',
      [password, userId]
    );

    res.send('Password updated successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
