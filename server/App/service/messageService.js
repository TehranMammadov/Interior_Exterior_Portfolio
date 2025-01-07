const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const getAllMessage = require("../repository/messageRepository.js");

const getMessages = async(lang,skip,limit) => {
    logger.debug('mainService.mainContent -- start');
    const message = await getAllMessage(skip,limit);
    if (!message){
        logger.warn('mainService.updateMainContent -- error');
        throw ApiError.GeneralException(language[lang].notFounded)
    }
    logger.debug('mainService.mainContent -- success');
    return message;
}

module.exports = {
    getMessages
}
