module.exports = class enPortfolioDTO {
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
        this.title = model.enTitle
        this.description = model.enDescription
        this.content = model.enContent
        this.moduleTitle = model.module.map(obj => obj.enModuleTitle)
        this.moduleDescription = model.module.map(obj => obj.enModuleDescription)
        this.posterImage = model.posterImage
        this.footerImage = model.footerImage
    }
}