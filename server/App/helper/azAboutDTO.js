module.exports = class azAboutDTO {
    id
    title
    quote
    description
    image
    content
    constructor(model) {
        this.id = model._id
        this.title = model.azTitle
        this.quote = model.azQuote
        this.description = model.azDescription
        this.image = model.headerImage
        this.content = model.content
    }
}