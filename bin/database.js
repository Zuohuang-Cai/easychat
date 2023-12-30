const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'bit_academy',
  database: 'easychat',
  password: 'bit_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
module.exports = pool;