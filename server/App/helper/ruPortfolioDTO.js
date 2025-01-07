module.exports = class ruPortfolioDTO {
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
        this.title = model.ruTitle
        this.description = model.ruDescription
        this.content = model.ruContent
        this.moduleTitle = model.module.map(obj => obj.ruModuleTitle)
        this.moduleDescription = model.module.map(obj => obj.azModuleDescription)
        this.posterImage = model.posterImage
        this.footerImage = model.footerImage
    }
}