module.exports = class enAboutDTO {
    id
    title
    quote
    description
    image
    content
    constructor(model) {
        this.id = model._id
        this.title = model.enTitle
        this.quote = model.enQuote
        this.description = model.enDescription
        this.image = model.headerImage
        this.content = model.content
    }
}