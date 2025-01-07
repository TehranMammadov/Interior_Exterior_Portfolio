module.exports = class ruBlogDTO {
    id
    title
    description
    content
    image
    constructor(model) {
        this.id = model._id
        this.title = model.ruTitle
        this.description = model.ruDescription
        this.content = model.ruContent
        this.image = model.posterImage
    }
}