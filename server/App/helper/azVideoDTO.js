module.exports = class azVideoDTO {
    id
    url
    title
    description
    constructor(model) {
        this.id = model._id
        this.url = model.url
        this.title = model.azTitle
        this.description = model.azDescription
    }
}