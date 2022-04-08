const fs = require('fs')
const path = require("path");
const {DIR} = require("./constants");

module.exports = class File {
    constructor(name) {
        this.name = name;
        this.path = path.join(DIR, name)
        this.justCreated = false
        try {
            fs.closeSync(fs.openSync(this.path, 'wx'))
            this.justCreated = true
        } catch (e) {
        }
    }

    write(text) {
        fs.writeFileSync(this.path, text, {flag: 'a'})
    }

    read() {
        try {
            return fs.readFileSync(this.path).toString()
        } catch (e) {
            return ''
        }
    }

    delete() {
        try {
            fs.unlinkSync(this.path)
        } catch (e) {
            console.log(e)
        }
    }
}
