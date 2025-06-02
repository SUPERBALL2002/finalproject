 const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');  // เชื่อมต่อกับฐานข้อมูล
const userRoutes = require('./routes/users');  
const lessonRoutes = require('./routes/lessons');
const subjectRoutes = require('./routes/subjects');
const examRoutes = require('./routes/exams');
const authenticateToken = require('./Middleware/JWT');
//

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

// ใช้ routes จากไฟล์ 'routes/users.js'
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/exams', examRoutes);
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// ประกาศใน routes 
