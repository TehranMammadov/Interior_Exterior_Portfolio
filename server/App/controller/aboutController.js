const logger = require("../logger/index.js");
const {removeImage} = require("../utill/removeImage.js");
const {addModuleToAbout,deleteModule,createAboutContent,getAboutContent,updateAboutDetails,editAboutContent,editAboutModule} = require("../service/aboutService.js");
const checkLanguage = require("../utill/accept_language");



 const addAboutContent = async (req, res, next) => {
    logger.debug('aboutController.addAboutContent -- start');
    let lang = checkLanguage(req);
    try {
        const result = await createAboutContent(req.body,req.files,lang);
        logger.debug('aboutController.addAboutContent -- success');
        res.send({ result });
    } catch (error) {
        if (req.files){
            await removeImage(req.files);
        }
        next(error);
    }
};



 const updateAbout = async (req, res, next) => {
    logger.debug('aboutController.updateAbout -- start');
    let lang = checkLanguage(req);
    try {
        const result = await updateAboutDetails(req.body,req.files,lang);
        logger.debug('aboutController.updateAbout -- success');
        res.send({ result });
    } catch (error) {
        if (req.files){
            await removeImage(req.files);
        }
        next(error);
    }
};



  const updateAboutContent = async (req, res, next) => {
    logger.debug('aboutController.updateAboutContent -- start');
    let lang = checkLanguage(req);
    const {id} = req.params;
    try {
        const result = await editAboutContent(id,req.body,req.files,lang);
        logger.debug('aboutController.updateAboutContent -- success');
        res.send({ result });
    } catch (error) {
        if (req.files){
            await removeImage(req.files);
        }
        next(error);
    }
};



 const updateModule = async (req, res, next) => {
    logger.debug('aboutController.updateAboutModule -- start');
    let lang = checkLanguage(req);
    const {id} = req.params
    try {
        const result = await editAboutModule(id,req.body,lang);
        logger.debug('aboutController.updateAboutModule -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};


const deleteModules = async (req, res, next) => {
    logger.debug('aboutController.deleteModules -- start');
    let lang = checkLanguage(req);
    const {id} = req.params
    try {
        const result = await deleteModule(id,lang);
        logger.debug('aboutController.deleteModules -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};


const addModules = async (req, res, next) => {
    logger.debug('aboutController.addModules -- start');
    let lang = checkLanguage(req);
    try {
        const result = await addModuleToAbout(req.body,lang);
        logger.debug('aboutController.addModules -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};


  const getAbout = async (req, res, next) => {
    logger.debug('aboutController.getAboutContent -- start');
    try {
        let getLang = req.headers["accept-language"]
        const lang = checkLanguage(req);
        const result = await getAboutContent(lang, getLang);
        logger.debug('aboutController.getAboutContent -- success');
        res.send({ result });
    } catch (error){
        next(error);
    }
};

  module.exports = {
      addModules,deleteModules,addAboutContent,updateAbout,updateAboutDetails,updateModule,getAbout,updateAboutContent
  }