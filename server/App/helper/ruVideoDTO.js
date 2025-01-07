module.exports = class ruVideoDTO {
    id
    url
    title
    description
    constructor(model) {
        this.id = model._id
        this.url = model.url
        this.title = model.ruTitle
        this.description = model.ruDescription
    }
}