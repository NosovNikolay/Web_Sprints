let mysql
try {
  mysql = require('mysql2')
} catch {
  mysql = require('mysql')
}

const config = require('./config.json')

const connection = mysql.createConnection(config)

module.exports = connection
