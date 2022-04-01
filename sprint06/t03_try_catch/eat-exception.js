'use strict';

module.exports.EatException = class EatException extends Error {
    constructor() {
        super()
        this.name = 'EatException'
        this.message = 'No more junk food, dumpling'
    }
}
