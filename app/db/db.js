// db.js
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
});

export default connection;