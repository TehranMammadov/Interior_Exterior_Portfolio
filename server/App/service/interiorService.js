const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const {deleteOldImages} = require("./multerService.js");
const {
    create,
    updateInteriorById,
    deleteOne,
    findInterior,
    getInterior,
    getInteriorsByCategory,
    get, getOne ,updateModule, removeModule
} = require("../repository/interiorRepository");
const {createImage, findAndUpdateImageById} = require("../repository/blogRepository.js");
const {removeImageById} = require("../repository/blogRepository");
const {createModule, getPortfolio} = require("../repository/interiorRepository.js");


const post = async (lang, body, files) => {
    logger.debug('InteriorService.post -- start');
    const {title, category, description, content,module,place,startDate,endDate,spiker} = body
    let queryCreateInterior = {title, category, description, content,place,startDate,endDate,spiker};
    let  list;
    if (module){
        const $module = JSON.parse("[" + module + "]");
        if ($module){
            list = await $module.map((doc)=>{
                return doc;
            });
        }
    }else {
        logger.debug('InteriorService.post -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    if (files.poster) {
        let postArr = [];
        for (const img of files.poster) {
            let posterImagePath = process.env.URL + img.filename;
            const image = await createImage(posterImagePath);
            postArr.push(image._id);
        }
        new Promise(async (resolve) => {
            resolve(queryCreateInterior.posterImage = postArr)
        });
    }
    if (files.footerImage) {
        let footerArr = [];
        for (const img of files.footerImage) {
            const footerImagePath = process.env.URL + img.filename;
            const image = await createImage(footerImagePath);
            footerArr.push(image._id);
        }
        new Promise(async (resolve) => {
            resolve(queryCreateInterior.footerImage = footerArr)
        });
    }
    let moduleArr = [];
    if (module){
        for (const doc of list) {
            let module = await createModule(doc);
            if (!module){
                logger.debug('InteriorService.post -- db result null');
                throw ApiError.GeneralException(language[lang].nullParam);
            }
            moduleArr.push(module._id);
        }
    }else {
        logger.debug('InteriorService.post -- module not founded');
        throw ApiError.BadRequest(language[lang].nullParam);
    }

    queryCreateInterior.module = moduleArr;
    const interior = await create(queryCreateInterior);
    if (!interior) {
        logger.warn('InteriorService.post -- error');
        throw ApiError.GeneralException(language[lang].serverError)
    }

    logger.debug('InteriorService.post -- success');
    return language[lang].interiorSuccessfullyCreated;
}


const update = async (lang, body, files) => {
    logger.debug('InteriorService.update -- start');
    const {id, title, category, description, content,place,startDate,endDate,spiker} = body
    if (!id) {
        logger.warn('InteriorService.update -- null param');
        throw ApiError.BadRequest(language[lang].blogNotExist)
    }
    let queryUpdateInterior = {title, category, description, content,place,startDate,endDate,spiker};
    const paths = [];
    const interiorSchema = await findInterior(id);
    if (!interiorSchema) {
        logger.warn('InteriorService.update -- null param');
        throw ApiError.NotFoundException('Interior mövcud deyil')
    }

    if (files.poster) {
        for (const img of files.poster) {
            const posterImage = process.env.URL + img.filename;
            const image = await findAndUpdateImageById(interiorSchema.posterImage[0], {url: posterImage});
            paths.push(image.url)
        }
    }

    if (files.footerImage) {
        for (const img of files.footerImage) {
            let footerArr = [];
            for (const img of files.footerImage) {
                const footerImagePath = process.env.URL + img.filename;
                const image = await createImage(footerImagePath);
                footerArr.push(image._id);
            }
            new Promise(async (resolve) => {
                resolve(queryUpdateInterior.footerImage = footerArr)
            });
        }
        for (const img of interiorSchema.footerImage) {
            let im = await removeImageById(img);
            paths.push(im.url);
        }
    }
    const interior = await updateInteriorById(id, queryUpdateInterior);
    if (!interior) {
        logger.warn('InteriorService.update -- not founded');
        throw ApiError.NotFoundException(language[lang].serverError)
    }
    await deleteOldImages(paths)
    logger.debug('InteriorService.update -- success');
    return language[lang].interiorUpdatedMessage;
}


const getAll = async (lang) => {
    logger.debug('InteriorService.getAll -- start');
    const interiors = await get();
    if (interiors.length === 0) {
        logger.warn('InteriorService.getAll -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }
    logger.debug('InteriorService.getAll -- success');
    return interiors
}


const interiorsByCategory = async (lang, category) => {
    logger.debug('InteriorService.interiorsByCategory -- start');
    const interiors = await getInteriorsByCategory(category);
    if (interiors.length === 0) {
        logger.warn('InteriorService.interiorsByCategory -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }
    logger.debug('InteriorService.interiorsByCategory -- success');
    return interiors
}


const getInteriorById = async (lang, id) => {
    logger.debug('InteriorService.getAll -- start');
    const interiors = await getInterior(id);
    if (interiors === null) {
        logger.warn('InteriorService.getAll -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }
    logger.debug('InteriorService.getAll -- success');
    return interiors
};


const getFiltereds = async (filter) => {
    logger.debug('InteriorService.getFiltereds -- start');
    const filteredInteriors = await get(filter);
    if (filteredInteriors.length === 0) {
        logger.warn('InteriorService.getFiltereds -- not founded');
        throw ApiError.NotFoundException('Interior mövcud deyil')
    }
    logger.debug('InteriorService.getFiltereds -- success');
    return filteredInteriors
}
const getFiltered = async (filter, lang) => {
    logger.debug('InteriorService.getFiltered -- start');
    const filteredInterior = await getOne(filter);
    if (!filteredInterior) {
        logger.warn('InteriorService.getFiltered -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }
    logger.debug('InteriorService.getFiltered -- success');
    return filteredInterior
}

const _delete = async (id, lang) => {
    logger.debug('InteriorService._delete -- start');
    if (!id) {
        logger.warn('InteriorService._delete -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }
    const interior = await deleteOne(id);
    if (!interior) {
        logger.warn('InteriorService._delete -- not founded');
        throw ApiError.NotFoundException(language[lang].interiorNotExist)
    }

    let paths = [];
    const poster = interior.posterImage.map((doc) => {
        return doc.url;
    });
    const footer = interior.footerImage.map((doc) => {
        return doc.url;
    })
    paths.push(...poster);
    paths.push(...footer)
    await deleteOldImages(paths);
    logger.debug('InteriorService._delete -- success');
    return language[lang].interiorRemovedMessage
}

const editModule = async(id,body,lang) => {
    logger.debug('InteriorService.editAboutModule -- start')
    const {title,description} = body
    const queryModule = {title,description};
    const moduleSchema = await updateModule(id,queryModule);
    if (!moduleSchema){
        logger.warn(`InteriorService.editAboutModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('InteriorService.editAboutModule -- success');
    return language[lang].aboutModuleUpdated;
}




const deleteModule = async(id,lang) => {
    logger.debug('InteriorService.deleteModule -- start')
    const moduleSchema = await removeModule(id);
    if (!moduleSchema && moduleSchema.deletedCount === 0 ){
        logger.warn(`InteriorService.deleteModule -- null param ${JSON.stringify(moduleSchema)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    logger.debug('InteriorService.deleteModule -- success');
    return language[lang].aboutModuleUpdated;
}


const addModuleToInterior = async(id,query,lang) => {
    logger.debug('InteriorService.addModuleToInterior -- start')
    const module = await createModule(query)
    if (!module){
        logger.warn(`InteriorService.addModuleToInterior -- null param ${JSON.stringify(module)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    const interior = await getInterior(id);
    if (!interior){
        logger.warn(`InteriorService.addModuleToInterior -- null param ${JSON.stringify(interior)}`);
        throw ApiError.GeneralException(language[lang].serverError)
    }
    interior.module.push(module._id);
    interior.save();
    logger.debug('InteriorService.addModuleToInterior -- success');
    return language[lang].aboutModuleUpdated;
}



module.exports = {
    addModuleToInterior,
    deleteModule,
    editModule,
    post,
    getAll,
    getFiltereds,
    getFiltered,
    _delete,
    update,
    getInteriorById,
    interiorsByCategory
}