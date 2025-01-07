module.exports = class azPortfolioDTO {
    id
    title
    description
    content
    moduleTitle
    moduleDescription
    posterImage
    footerImage
    constructor(model) {
        this.id = model._id
        this.title = model.azTitle
        this.description = model.azDescription
        this.content = model.azContent
        this.moduleTitle = model.module.map(obj => obj.azModuleTitle)
        this.moduleDescription = model.module.map(obj => obj.azModuleDescription)
        this.posterImage = model.posterImage
        this.footerImage = model.footerImage
    }
}