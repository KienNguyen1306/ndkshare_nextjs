// db.js
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password:process.env.PASSWORD,
  port:3306,

});

export default connection;