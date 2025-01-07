module.exports = class azMainDTO {
    id
    title
    titleExtension
    image
    quote
    author
    constructor(model) {
        this.id = model._id
        this.title = model.enTitle
        this.titleExtension = model.enTitleExtension
        this.image = model.image
        this.quote = model.enQuote
        this.author = model.enAuthor
    }
}