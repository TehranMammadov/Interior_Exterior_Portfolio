module.exports = class azMainDTO {
    id
    title
    titleExtension
    image
    quote
    author
    constructor(model) {
        this.id = model._id
        this.title = model.ruTitle
        this.titleExtension = model.ruTitleExtension
        this.image = model.image
        this.quote = model.ruQuote
        this.author = model.ruAuthor
    }
}