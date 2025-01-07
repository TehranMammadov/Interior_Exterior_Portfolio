module.exports = class enVideoDTO {
    id
    url
    title
    description
    constructor(model) {
        this.id = model._id
        this.url = model.url
        this.title = model.enTitle
        this.description = model.enDescription
    }
}