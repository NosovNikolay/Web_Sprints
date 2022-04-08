const mysql = require('mysql2')
const config = require('./config.json')
const connection = mysql.createConnection(config)
module.exports = connection.promise()
