'use strict'

let EatException = require('./eat-exception')

module.exports.Product = class Product {
    constructor(name, kcal_per_portion) {
        this.name = name
        this.kcal_per_portion = kcal_per_portion
    }
    check() {
        if (this.kcal_per_portion > 200) {
            throw new EatException()
        }
    }
}
