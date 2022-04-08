const Comment = require('./Comment')
const {any2array} = require("./utils");

module.exports = class AvengerQuote {
    constructor(id, author, quote, photo, publishDate, comments) {
        this.id = id
        this.author = author
        this.quote = quote
        this.photo = photo
        this.publishDate = publishDate
        this.comments = comments
    }

    toObject() {
        return {
            id: this.id,
            author: this.author,
            quote: this.quote,
            photo: this.photo,
            publishDate: this.publishDate.toISOString(),
            comments: this.comments.map(c => c.toObject()),
        }
    }

    static fromObject(obj) {
        return new this(obj.id, obj.author, obj.quote, any2array(obj.photo), new Date(obj.publishDate), any2array(obj.comments).map(c => Comment.fromObject(c)))
    }
}
