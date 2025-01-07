const logger = require("../logger/index.js");
const messageSchema = require("../models/messageSchema.js");

module.exports= async (skip=0,limit=10) => {
    try {
        logger.debug('messageRepo.getAll -- start');
        const message = await messageSchema.find().skip(skip).limit(limit).lean();
        logger.debug('messageRepo.getAll -- success');
        return message;
    } catch (error) {
        throw error
    }
}