const mysql = require('mysql2');
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

const connection = mysql.createConnection(config)
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('Connected to database')
})

export default connection

