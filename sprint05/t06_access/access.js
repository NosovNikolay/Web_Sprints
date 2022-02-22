module.exports = class Acces {
    get mark_LXXXV() {
        if (this._mark_LXXXV === undefined)
            return 'undefined'

        if (this._mark_LXXXV === null)
            return 'null'

        return this._mark_LXXXV
    }

    set mark_LXXXV(value) {
        this._mark_LXXXV = value
    }
}