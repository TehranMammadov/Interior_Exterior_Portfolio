const {get,getOne,create,deleteOne,updatePortfolioById,getPortfolio} = require('../repository/portfolioRepository.js');
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const {deleteOldImages} = require("./multerService.js");
const {findPortfolio,getPortfoliosByCategory,createModule, updateModule, removeModule} = require("../repository/portfolioRepository.js");
const {createImage, findAndUpdateImageById} = require("../repository/blogRepository.js");
const { removeImageById} = require("../repository/blogRepository");
const enPortfolioDTO = require("../helper/enPortfolioDTO");
const azPortfolioDTO = require("../helper/azPortfolioDTO");
const ruPortfolioDTO = require("../helper/ruPortfolioDTO");


const post = async(lang,body,files) => {
    logger.debug('portfolioService.post -- start');
    const {azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent ,module} = body
    let queryCreatePortfolio={azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent ,module};
    let  list;
    if (module){
        const $module = JSON.parse("[" + module + "]");
        if ($module){
                list = await $module.map((doc)=>{
                return doc;
            });
        }
    }else {
        logger.debug('aboutService.createAboutContent -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    if (files.poster){
        let postArr = [];
        for (const img of files.poster) {
            let posterImagePath = process.env.URL + img.filename;
            const image = await createImage(posterImagePath);
            postArr.push(image._id);
        }
        new Promise(async (resolve) => {
            resolve(queryCreatePortfolio.posterImage = postArr)
        });
    }
    if (files.footerImage){
        let footerArr = [];
        for (const img of files.footerImage) {
            const footerImagePath = process.env.URL + img.filename;
            const image = await createImage(footerImagePath);
            footerArr.push(image._id);
        }
        new Promise(async (resolve) => {
            resolve(queryCreatePortfolio.footerImage = footerArr)
        });
    }
    let moduleArr = [];
    if (module){
        for (const doc of list) {
            let module = await createModule(doc);
            if (!module){
                logger.debug('aboutService.createAboutContent -- db result null');
                throw ApiError.GeneralException(language[lang].nullParam);
            }
            moduleArr.push(module._id);
        }
    }else {
        logger.debug('aboutService.createAboutContent -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    queryCreatePortfolio.module = moduleArr;
    const portfolio = await create(queryCreatePortfolio);
    if (!portfolio){
        logger.warn('portfolioService.post -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }

    logger.debug('portfolioService.post -- success');
    return language[lang].portfolioSuccessfullyCreated;
}

const update = async(lang,body,files) => {
    logger.debug('portfolioService.update -- start');
    const {id,azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, module} = body
    if(!id){
        logger.warn('portfolioService.update -- null param');
        throw ApiError.BadRequest(language[lang].blogNotExist)
    }
    let queryUpdatePortfolio={azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription,/* category,*/azContent, enContent, ruContent, module};
    let  list;
    if (module){
        const $module = JSON.parse("[" + module + "]");
        if ($module){
            list = await $module.map((doc)=>{
                return doc;
            });
        }
    }else {
        logger.debug('aboutService.createAboutContent -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    const paths = [];
    const portfolioSchema = await findPortfolio(id);
    if (!portfolioSchema){
        logger.warn('portfolioService.update -- null param');
        throw ApiError.NotFoundException('Portfolio mövcud deyil')
    }

    if (files.poster){
        for (const img of files.poster) {
            const posterImage = process.env.URL + img.filename;
                const image = await findAndUpdateImageById(portfolioSchema.posterImage[0],{url:posterImage});
                paths.push(image.url)
        }
    }

    if (files.footerImage){
        for (const img of files.footerImage) {
            let footerArr = [];
            for (const img of files.footerImage) {
                const footerImagePath = process.env.URL + img.filename;
                const image = await createImage(footerImagePath);
                footerArr.push(image._id);
            }
            new Promise(async (resolve) => {
                resolve(queryUpdatePortfolio.footerImage = footerArr)
            });
        }
        for (const img of portfolioSchema.footerImage) {
            let im = await removeImageById(img);
            paths.push(im.url);
        }
    }
    const portfolioForUpdate = await findPortfolio(id)
    let moduleArr = [];
    if (module){
        for (let i=0; i < portfolioForUpdate.module.length; i++) {
                let module = await updateModule(portfolioForUpdate.module[i]._id,list[0][i]);
                if (!module) {
                    logger.debug('aboutService.createAboutContent -- db result null');
                    throw ApiError.GeneralException(language[lang].nullParam);
                }
                moduleArr.push(module._id)
        }
    }else {
        logger.debug('aboutService.createAboutContent -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    queryUpdatePortfolio.module = moduleArr
    const portfolio = await updatePortfolioById(id,queryUpdatePortfolio);
    if (!portfolio){
        logger.warn('portfolioService.update -- not founded');
        throw ApiError.NotFoundException(language[lang].serverError)
    }
    if(paths)
        await deleteOldImages(paths)
    logger.debug('portfolioService.update -- success');
    return language[lang].portfolioUpdatedMessage;
}



const getAll = async(lang, getLang) => {
    logger.debug('blogController.getAll -- start');
    const portfolios = await get();
    console.log("PPortfolios", portfolios)
    console.log("______________________________new")
    if (portfolios.length === 0 ){
        logger.warn('blogController.getAll -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }
    let dto;
    if (getLang === 'en') {
        dto = portfolios.map((docs) => new enPortfolioDTO(docs))
    } else if (getLang === 'az') {
        dto = portfolios.map((docs) => new azPortfolioDTO(docs))
    } else if (getLang === 'ru') {
        dto = portfolios.map((docs) => new ruPortfolioDTO(docs))
    } else {
        dto = portfolios
    }
    logger.debug('blogController.getAll -- success');
    return dto
}


/*const portfoliosByCategory = async(lang,category) => {
    logger.debug('blogController.portfoliosByCategory -- start');
    const portfolios = await getPortfoliosByCategory(category);
    if (portfolios.length === 0 ){
        logger.warn('blogController.portfoliosByCategory -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }
    logger.debug('blogController.portfoliosByCategory -- success');
    return portfolios
}*/



const getPortfolioById = async(lang,id, getLang) => {
    logger.debug('blogController.getAll -- start');
    const portfolios = await getPortfolio(id);
    if (portfolios === null){
        logger.warn('blogController.getAll -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }let dto;
    if (getLang === 'en') {
        dto = new enPortfolioDTO(portfolios)
    } else if (getLang === 'az') {
        dto = new azPortfolioDTO(portfolios)
    } else if (getLang === 'ru') {
        dto = new ruPortfolioDTO(portfolios)
    } else {
        dto = portfolios
    }
    logger.debug('blogController.getAll -- success');
    return dto
};


const getFiltereds = async(filter) => {
    logger.debug('blogController.getFiltereds -- start');
    const filteredPortfolios = await get(filter);
    if (filteredPortfolios.length === 0 ){
        logger.warn('blogController.getFiltereds -- not founded');
        throw ApiError.NotFoundException('Portfolio mövcud deyil')
    }
    logger.debug('blogController.getFiltereds -- success');
    return filteredPortfolios
}
const getFiltered = async(filter,lang) => {
    logger.debug('blogController.getFiltered -- start');
    const filteredPortfolio = await getOne(filter);
    if (!filteredPortfolio){
        logger.warn('blogController.getFiltered -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }
    logger.debug('blogController.getFiltered -- success');
    return filteredPortfolio
}

const _delete = async (id,lang) => {
    logger.debug('portfolioService._delete -- start');
    if (!id){
        logger.warn('portfolioService._delete -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }
    const portfolio = await deleteOne(id);
    if (!portfolio){
        logger.warn('portfolioService._delete -- not founded');
        throw ApiError.NotFoundException(language[lang].portfolioNotExist)
    }

    let paths = [];
    const poster = portfolio.posterImage.map((doc)=>{
        return doc.url;
    });
    const footer = portfolio.footerImage.map((doc)=>{
        return doc.url;
    })
    paths.push(...poster);
    paths.push(...footer)
    await deleteOldImages(paths);
    logger.debug('portfolioService._delete -- success');
    return language[lang].portfolioRemovedMessage
}


const editModule = async(id,body,lang) => {
    logger.debug('portfolioService.editAboutModule -- start')
    const {title,description} = body
    const queryModule = {title,description};
    const moduleSchema = await updateModule(id,queryModule);
    if (!moduleSchema){
        logger.warn(`portfolioService.editAboutModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('portfolioService.editAboutModule -- success');
    return language[lang].aboutModuleUpdated;
}




const deleteModule = async(id,lang) => {
    logger.debug('portfolioService.deleteModule -- start')
    const moduleSchema = await removeModule(id);
    if (!moduleSchema && moduleSchema.deletedCount === 0 ){
        logger.warn(`portfolioService.deleteModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('portfolioService.deleteModule -- success');
    return language[lang].aboutModuleUpdated;
}

const addModuleToPortfolio = async(id,query,lang) => {
    logger.debug('portfolioService.addModuleToPortfolio -- start')
    const module = await createModule(query)
    if (!module){
        logger.warn(`portfolioService.addModuleToPortfolio -- null param ${JSON.stringify(module)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    const portfolio = await getPortfolio(id);
    if (!portfolio){
        logger.warn(`portfolioService.addModuleToPortfolio -- null param ${JSON.stringify(about)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    portfolio.module.push(module._id);
    portfolio.save();
    logger.debug('portfolioService.addModuleToPortfolio -- success');
    return language[lang].aboutModuleUpdated;
}



module.exports = {
    addModuleToPortfolio,
    editModule,
    deleteModule,
    post,
    getAll,
    getFiltereds,
    getFiltered,
    _delete,
    update,
    getPortfolioById,
    //portfoliosByCategory
}