//ไว้ต่อdb
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cim6104',
  database: 'final',
  port: 3306 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL!');
});

module.exports = connection;
