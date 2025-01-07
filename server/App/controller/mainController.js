const {addMainContent,updateMainContent,mainContent} = require("../service/mainService.js");
const logger = require("../logger/index.js");
const {removeImage} =  require("../utill/removeImage.js");
const checkLanguage = require("../utill/accept_language");


const addMainHeader = async (req, res, next) => {
    logger.debug('mainController.addMainHeader -- start');
    let lang = checkLanguage(req);
    try {
        const result = await addMainContent(req.body,req.files,lang);
        logger.debug('mainController.addMainHeader -- success');
        res.send({ result });
    } catch (error) {
        await removeImage(req.files);
        next(error);
    }
};


 const updateMainHeader = async (req, res, next) => {
    logger.debug('mainController.updateMainHeader -- start');
    let lang = checkLanguage(req);
    try {
        const result = await updateMainContent(req.body,req.files,lang);
        logger.debug('mainController.updateMainHeader -- success');
        res.send({ result });
    } catch (error) {
        if (req.files){
            await removeImage(req.files);
        }
        next(error);
    }
};


 const getMainHeader = async (req, res, next) => {
    logger.debug('mainController.getMainHeader -- start');
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    try {
        const result = await mainContent(lang, getLang);
        logger.debug('mainController.getMainHeader -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

 module.exports={
     addMainHeader,getMainHeader,updateMainHeader
 }