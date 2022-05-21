'use strict'

const mysql = require('../db')
const Model = require('../model')

module.exports = class User extends Model {
    constructor(login, hash, full_name, email, user_role = 'user') {
        super()
        this.login = login
        this.hash = hash
        this.full_name = full_name
        this.email = email
    }
    request(response) {
        let user = {
            login: this.login,
            hash: this.hash,
            fullName: this.full_name,
            email: this.email,
        }
        mysql.db_query(user, response)
    }
}