const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const saltRounds = 10
const config = require('./config.json')
const connection = mysql.createConnection(config)

function db_query(user, response) {
    const sql = 'INSERT INTO users SET ?'
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds))

    connection.query(sql, user, function (err, rows) {
        if (err) {
            return response.render('./views/registration', {
                errorMsg: err.message
            })
        }
        response.render('./views/profile', user)
    })
}

module.exports.db_query = db_query
