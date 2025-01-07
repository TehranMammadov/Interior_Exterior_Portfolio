module.exports = class azMainDTO {
    id
    title
    titleExtension
    image
    quote
    author
    constructor(model) {
        this.id = model._id
        this.title = model.azTitle
        this.titleExtension = model.azTitleExtension
        this.image = model.image
        this.quote = model.azQuote
        this.author = model.azAuthor
    }
}