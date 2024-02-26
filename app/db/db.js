// db.js
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "ndkshare",
});

export default connection;