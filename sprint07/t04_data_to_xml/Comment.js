module.exports = class Comment {
    constructor(date, comment) {
        this.date = date
        this.comment = comment
    }

    toObject() {
        return {
            date: this.date.toISOString(),
            comment: this.comment,
        }
    }

    static fromObject(obj) {
        return new this(new Date(obj.date), obj.comment)
    }

}
