const {XMLParser, XMLBuilder} = require('fast-xml-parser')

const parser = new XMLParser();
const builder = new XMLBuilder({
    format: true
});


const AvengerQuote = require('./AvengerQuote')
const {readFile, writeFile, any2array} = require("./utils");

module.exports = class ListAvengerQuotes {
    constructor(arr = []) {
        this.list = arr
    }

    static async fromXML(filename) {
        return this.fromObject( parser.parse(await readFile(filename)))
    }

    static fromObject(obj) {
        return new this(any2array(obj.list).map(q => AvengerQuote.fromObject(q)))
    }

    toObject() {
        return {
            list: this.list.map(q => q.toObject()),
        }
    }

    async toXML(filename) {
        await writeFile(filename, builder.build(this.toObject()))
    }
}
