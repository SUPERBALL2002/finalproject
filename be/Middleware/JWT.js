const jwt = require('jsonwebtoken');

// Middleware สำหรับตรวจสอบ JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user;  // เก็บข้อมูลผู้ใช้ใน request
    next();  // ถ้า token ถูกต้องให้ไปยังฟังก์ชันถัดไป
  });
};

module.exports = authenticateToken;