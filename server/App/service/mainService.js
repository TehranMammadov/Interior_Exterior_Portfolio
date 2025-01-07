const logger = require("../logger/index.js");
const {createImage, findAndUpdateImageById, removeImageById, updatePosterImage} = require("../repository/blogRepository.js");
const {createMainContent,findMainImage,findMainSchema,updateContent,getMainSchema} = require("../repository/mainRepository.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const mainSchema = require("../models/mainSchema.js");
const {deleteOldImages} = require("./multerService.js");
const enMainDTO = require("../helper/enMainDTO");
const azMainDTO = require("../helper/azMainDTO");
const ruMainDTO = require("../helper/ruMainDTO");

const addMainContent = async(body,files,lang) => {
    logger.debug('mainService.addMainContent -- start');
    const {azTitle, enTitle, ruTitle, azTitleExtension, enTitleExtension, ruTitleExtension, azQuote, enQuote, ruQuote, azAuthor, enAuthor, ruAuthor} = body
    let queryCreateMainHeader={azTitle, enTitle, ruTitle, azTitleExtension, enTitleExtension, ruTitleExtension, azQuote, enQuote, ruQuote, azAuthor, enAuthor, ruAuthor};
    if (files.poster){
        let postArr = [];
        for (const img of files.poster) {
            let posterImagePath = process.env.URL + img.filename;
            const newImage = await createImage(posterImagePath);
            postArr.push(newImage._id);
        }
        new Promise(async (resolve) => {
            resolve(queryCreateMainHeader.image = postArr)
        });
    }
    const mainHeader = await createMainContent(queryCreateMainHeader);
    if (!mainHeader){
        logger.warn('mainService.addMainContent -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('mainService.addMainContent -- success');
    return language[lang].mainContentCreated;
}




const updateMainContent = async(body,files,lang) => {
    logger.debug('mainService.updateMainContent -- start');
    const {
        id,
        azTitle,
        enTitle,
        ruTitle,
        azTitleExtension,
        enTitleExtension,
        ruTitleExtension,
        azQuote,
        enQuote,
        ruQuote,
        azAuthor,
        enAuthor,
        ruAuthor
    } = body
    let queryCreateMainHeader = {
        id,
        azTitle,
        enTitle,
        ruTitle,
        azTitleExtension,
        enTitleExtension,
        ruTitleExtension,
        azQuote,
        enQuote,
        ruQuote,
        azAuthor,
        enAuthor,
        ruAuthor
    };
    //const mainSchema = await findMainSchema({_id:'62c58b6112e56b7fc9a654d5'});
    const mainSchema = await findMainSchema({_id: id});
    const paths = []
    let postArr = [];
    if (files.poster) {
        for (const img of files.poster) {
            const posterImage = process.env.URL + img.filename;
            if (mainSchema.image[0] != null && !posterImage) {
                const image = await findAndUpdateImageById(mainSchema.image[0], {url: posterImage});
                paths.push(image._id);
            } else {
                const newImage = await createImage(posterImage);
                postArr.push(newImage._id);
            }
        }
    }
    if (postArr.length > 0)
    {
        new Promise(async (resolve) => {
            resolve(queryCreateMainHeader.image = postArr)
        });
    }
    const mainHeader = await updateContent(/*mainSchema._id,*/queryCreateMainHeader);
    if (!mainHeader){
        logger.warn('mainService.updateMainContent -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }
    await deleteOldImages(paths)
    logger.debug('mainService.addMainContent -- success');
    return language[lang].mainContentUpdated;
}


const mainContent = async(lang, getLang) => {
    logger.debug('mainService.mainContent -- start');
    const main = await getMainSchema();
    console.log(main)
    if (!main){
        logger.warn('mainService.updateMainContent -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }
    let dto;
    if (getLang === 'en') {
        dto = main.map((docs) => new enMainDTO(docs))
    } else if (getLang === 'az') {
        dto = main.map((docs) => new azMainDTO(docs))
    } else if (getLang === 'ru') {
        dto = main.map((docs) => new ruMainDTO(docs))
    } else {
        dto = main
    }
    logger.debug('mainService.mainContent -- success');
    return dto;
}

module.exports = {
    addMainContent,
    updateMainContent,
    mainContent
}