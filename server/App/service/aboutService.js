const logger = require("../logger/index.js");
const {removeModule,createAbout,createContent,findContent,updateContent,createModule,getAbout,updateAbout,updateModule} = require("../repository/aboutRepository.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const azAboutDTO = require("../helper/azAboutDTO");
const enAboutDTO = require("../helper/enAboutDTO");
const ruAboutDTO = require("../helper/ruAboutDTO");
const {createImage, findAndUpdateImageById} = require("../repository/blogRepository.js");
const {deleteOldImages} = require('./multerService.js');
const {isBefore} = require("validator");
const enBlogDTO = require("../helper/enBlogDTO");
const {getAboutById} = require("../repository/aboutRepository");
const {findImageById} = require("../repository/blogRepository");

 const createAboutContent = async(body,files,lang) => {
    logger.debug('aboutService.createAboutContent -- start')
    const {azTitle, enTitle, ruTitle,
           azQuote, enQuote, ruQuote} = body
    const queryAbout = {azTitle, enTitle, ruTitle, azQuote, enQuote, ruQuote};
    /*let list;
    const $module = JSON.parse("[" + module + "]");
    if ($module){
        list = await $module.map((doc)=>{
            return doc;
        });
    }*/
    const contentList = []

    if (files.about){
        let aboutArr = [];
        for (const img of files.about) {
            let aboutImagePath = process.env.URL + img.filename;
            const newImage = await createImage(aboutImagePath);
            aboutArr.push(newImage._id);
        }
        queryAbout.headerImage = aboutArr
    }else {
        logger.warn('aboutService.createAboutContent -- null param');
        throw ApiError.BadRequest(language[lang].nullParam)
    }

            if (files.about1) {
                let aboutArr = [];
                for (const img of files.about1) {
                    let aboutImagePath = process.env.URL + img.filename;
                    const newImage = await createImage(aboutImagePath);
                    if (!newImage && !aboutImagePath) {
                        logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(newImage)}`)
                        throw ApiError.GeneralException(language[lang].serverError)
                    }
                    aboutArr.push(newImage._id);
                }

                const aboutContentSchema = await createContent({
                    image: aboutArr
                });
                if (!aboutContentSchema) {
                    logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(aboutContentSchema)}`)
                    throw ApiError.GeneralException(language[lang].serverError)
                }
                contentList.push(aboutContentSchema._id);
            }


    /*if (files.about2){
        let aboutArr = [];
        for (const img of files.about2) {
            let aboutImagePath = process.env.URL + img.filename;
            const newImage = await createImage(aboutImagePath);
            if (!newImage){
                logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(newImage)}`)
                throw ApiError.GeneralException(language[lang].serverError);
            }
            aboutArr.push(newImage._id);
        }
        const aboutContentSchema = await createContent({row:2, azDescription:azDescription2, enDescription:enDescription2, ruDescription:ruDescription2,image:aboutArr});
        if (!aboutContentSchema){
            logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(aboutContentSchema)}`)
            throw ApiError.GeneralException(language[lang].serverError)
        }
        contentList.push(aboutContentSchema._id);
    }
    if (files.about3){
        let aboutArr = [];
        for (const img of files.about3) {
            let aboutImagePath = process.env.URL + img.filename;
            const newImage = await createImage(aboutImagePath);
            if (!newImage){
                logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(newImage)}`)
                throw ApiError.GeneralException(language[lang].serverError)
            }
            aboutArr.push(newImage._id);
        }
        const aboutContentSchema = await createContent({row:3, azDescription:azDescription3, enDescription:enDescription3, ruDescription:ruDescription3,image:aboutArr});
        if (!aboutContentSchema){
            logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(aboutContentSchema)}`)
            throw ApiError.GeneralException(language[lang].serverError)
        }
        contentList.push(aboutContentSchema._id);
    }*/
    queryAbout.content = contentList
    /*let moduleArr = []
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
    queryAbout.module = moduleArr;*/
    const aboutSchema = await createAbout(queryAbout);
    if (!aboutSchema){
        logger.warn(`aboutService.createAboutContent -- null param ${JSON.stringify(aboutSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('aboutService.createAboutContent -- success');
    return language[lang].aboutCreated;
}

 const updateAboutDetails = async(body,files,lang) => {
    logger.debug('aboutService.updateAboutDetails -- start')
    const {id, azTitle, enTitle, ruTitle,
           azQuote, enQuote, ruQuote} = body
    const queryAbout = {azTitle, enTitle, ruTitle,
                        azQuote, enQuote, ruQuote};
    const about = await getAboutById(id);
    if (!about){
        logger.warn(`aboutService.updateAboutDetails -- null param`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    let paths = [];
    if (files.about){
        for (const img of files.about) {
            let aboutImagePath = process.env.URL + img.filename;
            const newImage = await findAndUpdateImageById(about.headerImage._id,{url:aboutImagePath});
            paths.push(newImage.url);
            if (!newImage){
                logger.warn(`aboutService.updateAboutDetails -- null param ${JSON.stringify(newImage)}`)
                throw ApiError.GeneralException(language[lang].serverError)
            }
        }
    }
    let contentId;
    let aboutArr = []
     let checkIfExist = false
     if (files.about1) {
         let i = 0;
         for (const img of files.about1) {
             let aboutImagePath = process.env.URL + img.filename;
             contentId = await findContent(about.content[0]);
             if (contentId.image[i] != null && !aboutImagePath) {
                 const ifExist = await findImageById(contentId.image[i]._id);
                 if(ifExist){
                     checkIfExist = true;
                 }
                 const image = await findAndUpdateImageById(contentId.image[i]._id, {url:aboutImagePath});
                 paths.push(image._id)
                 aboutArr.push(image._id)
             } else {
                 checkIfExist = true;
                 const newImage = await createImage(aboutImagePath);
                 aboutArr.push(newImage._id);
             }
             i++
         }
     }
     if (aboutArr.length > 0)
     {
         new Promise(async () => {
             await updateContent(contentId._id, aboutArr)
         });
     }
    const aboutSchema = await updateAbout(about._id,queryAbout);
    if (!aboutSchema){
        logger.warn(`aboutService.updateAboutDetails -- null param ${JSON.stringify(aboutSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
     if(!checkIfExist)
        await deleteOldImages(paths);
    logger.debug('aboutService.updateAboutDetails -- success');
    return language[lang].aboutUpdated;
}


 const editAboutContent = async(id,body,files,lang) => {
    logger.debug('aboutService.updateAboutContent -- start')
    // const {azDescription, enDescription, ruDescription, row} = body
    // const queryContent = {azDescription, enDescription, ruDescription, row};
    const content = await findContent({_id:id});
    let paths = [];
    if (files.about){
        for (const img of files.about) {
            let aboutImagePath = process.env.URL + img.filename;
            const newImage = await findAndUpdateImageById(content.image,{url:aboutImagePath});
            paths.push(newImage.url);
            if (!newImage){
                logger.warn(`aboutService.editAboutContent -- null param ${JSON.stringify(newImage)}`)
                throw ApiError.GeneralException(language[lang].serverError)
            }
        }
    }
    const contentSchema = await updateContent(content._id,queryContent);
    if (!contentSchema){
        logger.warn(`aboutService.editAboutContent -- null param ${JSON.stringify(contentSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    if (files){
       await deleteOldImages(paths);
    }
    logger.debug('aboutService.updateAboutContent -- success');
    return language[lang].aboutContentUpdated;
}


/* const editAboutModule = async(id,body,lang) => {
    logger.debug('aboutService.editAboutModule -- start')
    const {title,description} = body
    const queryModule = {title,description};
    const moduleSchema = await updateModule(id,queryModule);
    if (!moduleSchema){
        logger.warn(`aboutService.editAboutModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('aboutService.editAboutModule -- success');
    return language[lang].aboutModuleUpdated;
}




const deleteModule = async(id,lang) => {
    logger.debug('aboutService.deleteModule -- start')
    const moduleSchema = await removeModule(id);
    if (!moduleSchema && moduleSchema.deletedCount === 0 ){
        logger.warn(`aboutService.deleteModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('aboutService.deleteModule -- success');
    return language[lang].aboutModuleUpdated;
}

const addModuleToAbout = async(query,lang) => {
    logger.debug('aboutService.addModuleToAbout -- start')
    const module = await createModule(query)
    if (!module){
        logger.warn(`aboutService.addModuleToAbout -- null param ${JSON.stringify(module)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    const about = await getAbout();
    if (!about){
        logger.warn(`aboutService.addModuleToAbout -- null param ${JSON.stringify(about)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    about.module.push(module._id);
    about.save();
    logger.debug('aboutService.addModuleToAbout -- success');
    return language[lang].aboutModuleUpdated;
}*/





const getAboutContent = async(lang, getLang) => {
    logger.debug('aboutService.getAboutContent -- start')
    const schema = await  getAbout();
    if (!schema){
        logger.warn(`aboutService.editAboutModule -- null param ${JSON.stringify(schema)}`);
        throw ApiError.NotFoundException(language[lang].notFounded)
    }
    let dto;
    if (getLang === 'en') {
        dto = schema.map((docs) => new enAboutDTO(docs))
    } else if (getLang === 'az') {
        dto = schema.map((docs) => new azAboutDTO(docs))
    } else if (getLang === 'ru') {
        dto = schema.map((docs) => new ruAboutDTO(docs))
    } else {
        dto = schema
    }
    logger.debug('aboutService.getAboutContent -- success');
    return dto;
}

module.exports={
    /*addModuleToAbout, deleteModule,*/ getAboutContent,editAboutContent,/*editAboutModule,*/createAboutContent,updateAboutDetails
}