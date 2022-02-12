const mysql = require('mysql2');
const config = {
  host: process.env.PROD_DB_HOST,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASS,
  database: process.env.PROD_DB_NAME
}

const connection = mysql.createConnection(config)
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('Connected to database')
})

export default connection

