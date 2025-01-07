module.exports = class azBlogDTO {
    id
    title
    description
    content
    image
    constructor(model) {
        this.id = model._id
        this.title = model.azTitle
        this.description = model.azDescription
        this.content = model.azContent
        this.image = model.posterImage
    }
}