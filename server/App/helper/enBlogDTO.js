module.exports = class enBlogDTO {
    id
    title
    description
    content
    image
    constructor(model) {
        this.id = model._id
        this.title = model.enTitle
        this.description = model.enDescription
        this.content = model.enContent
        this.image = model.posterImage
    }
}