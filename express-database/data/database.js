//get the client
const mysql = require("mysql2/promise");

//create connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: "39652520",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
