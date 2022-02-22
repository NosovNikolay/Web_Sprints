module.exports = {
    getAnonymous(name, alias, affiliation) {
        let Anonymous = class {
            constructor(name, alias, affiliation) {
                this.name = name
                this.alias = alias
                this.affiliation = affiliation
            }
        }
        return new Anonymous(name, alias, affiliation)
    }
}