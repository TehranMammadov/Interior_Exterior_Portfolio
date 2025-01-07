module.exports = class ruAboutDTO {
    id
    title
    quote
    description
    image
    content
    constructor(model) {
        this.id = model._id
        this.title = model.ruTitle
        this.quote = model.ruQuote
        this.description = model.ruDescription
        this.image = model.headerImage
        this.content = model.content
    }
}