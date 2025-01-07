const InteriorService = require("../service/interiorService");
const logger = require("../logger/index.js");
const {removeImage} = require("../utill/removeImage.js");
const checkLanguage = require("../utill/accept_language");



const addInterior = async (req, res, next) => {
    logger.debug('InteriorController.addInterior  -- start');
    let lang = checkLanguage(req);
    try {
        const result = await InteriorService.post(lang, req.body, req.files);
        logger.debug('InteriorController.addInterior  -- success');
        res.send({result});
    } catch (error) {
        if (req.files) {
            await removeImage(req.files);
        }
        next(error);
    }
};


const updateInterior = async (req, res, next) => {
    logger.debug('InteriorController.updateInterior -- start');
    let lang = checkLanguage(req);
    try {
        const result = await InteriorService.update(lang, req.body, req.files);
        logger.debug('InteriorController.updateInterior -- success');
        res.send({result});
    } catch (error) {
        if (req.files) {
            await removeImage(req.files);
        }
        next(error);
    }
};


const getInteriors = async (req, res, next) => {
    try {
        logger.debug('InteriorController.getInteriors -- start');
        let lang = checkLanguage(req);
        const result = await InteriorService.getAll(lang);
        logger.debug('InteriorController.getInteriors -- success');
        res.send({result});
    } catch (error) {
        next(error);
    }
};


const getInteriorsByCategory = async (req, res, next) => {
    try {
        logger.debug('InteriorController.getInteriors -- start');
        let lang = checkLanguage(req);
        const {category} = req.params;
        const result = await InteriorService.interiorsByCategory(lang, category);
        logger.debug('InteriorController.getInteriors -- success');
        res.send({result});
    } catch (error) {
        next(error);
    }
};


const getInterior = async (req, res, next) => {
    try {
        logger.debug('InteriorController.getInteriors -- start');
        let lang = checkLanguage(req);
        const {id} = req.params;
        const response = await InteriorService.getInteriorById(lang, id);
        logger.debug('InteriorController.getInteriors -- success');
        res.send({response});
    } catch (error) {
        next(error);
    }
};

const getInteriorBySlug = async (req, res, next) => {
    try {
        logger.debug('InteriorController.getInteriorBySlug -- start');
        let lang = checkLanguage(req);
        const {slug} = req.params;
        const response = await InteriorService.getFiltered({slug: slug}, lang);
        logger.debug('InteriorController.getInteriorBySlug -- success');
        res.send({response})
    } catch (error) {
        next(error);
    }
};

const deleteInterior = async (req, res, next) => {
    try {
        logger.debug('InteriorController.deleteInterior -- start');
        let lang = checkLanguage(req);
        const {id} = req.body
        const response = await InteriorService._delete(id, lang);
        logger.debug('InteriorController.deleteInterior -- success');
        res.send({response})
    } catch (error) {
        next(error);
    }
};


const updateModule = async (req, res, next) => {
    logger.debug('interiorController.updateAboutModule -- start');
    let lang = checkLanguage(req);
    const {id} = req.params
    try {
        const result = await InteriorService.editModule(id,req.body,lang);
        logger.debug('interiorController.updateAboutModule -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};


const deleteModules = async (req, res, next) => {
    logger.debug('interiorController.deleteModules -- start');
    let lang = checkLanguage(req);
    const {id} = req.params
    try {
        const result = await InteriorService.deleteModule(id,lang);
        logger.debug('interiorController.deleteModules -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

const addModules = async (req, res, next) => {
    logger.debug('interiorController.addModules -- start');
    const {id} = req.params
    let lang = checkLanguage(req);
    try {
        const result = await InteriorService.addModuleToInterior(id,req.body,lang);
        logger.debug('interiorController.addModules -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addModules,deleteModules,updateModule,addInterior, getInteriorBySlug, getInteriorsByCategory, getInteriors, getInterior, deleteInterior, updateInterior
}