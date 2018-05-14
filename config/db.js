const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'up',
  password: 'rtfmludicup1',
  database: 'upshare'
})

connection.connect()

module.exports = connection
