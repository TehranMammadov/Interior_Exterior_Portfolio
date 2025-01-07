const logger = require("../logger/index.js");
const {getMessages} = require("../service/messageService.js");
const checkLanguage = require("../utill/accept_language");

 const getMessageList = async (req, res, next) => {
    logger.debug('messageController.getMessage  -- start');
    let lang = checkLanguage(req);
    let {skip,limit} = req.body;
    try {
        const result = await getMessages(lang,skip,limit)
        logger.debug('messageController.getMessage  -- success');
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

module.exports={
    getMessageList
}