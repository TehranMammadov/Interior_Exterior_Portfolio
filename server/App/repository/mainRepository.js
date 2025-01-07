const logger = require("../logger/index.js");
const mainSchema =require("../models/mainSchema.js");
const imageSchema = require("../models/imageSchema.js");


 const createMainContent = async (query)=>{
    try {
        logger.debug('mainRepo.createMainContent -- start');
        const section = await mainSchema.create(query);
        await section.save();
        logger.debug('mainRepo.createMainContent -- success');
        return section
    } catch (error) {
        throw error
    }
}


 const updateContent = async (query)=>{
    try {
        logger.debug('mainRepo.updateMainContent -- start');
        const section = await mainSchema.findByIdAndUpdate(query.id, query);
        logger.debug('mainRepo.updateMainContent -- success');
        return section
    } catch (error) {
        throw error
    }
}

 const findMainImage = async (query)=>{
    try {
        logger.debug('mainRepo.findMainImage -- start');
        const img = await imageSchema.findOne(query);
        logger.debug('mainRepo.findMainImage -- success');
        return img
    } catch (error) {
        throw error
    }
}



 const findMainSchema = async (query)=>{
    try {
        logger.debug('mainRepo.findMainSchema -- start');
        const img = await mainSchema.findOne(query);
        logger.debug('mainRepo.findMainSchema -- success');
        return img
    } catch (error) {
        throw error
    }
}

 const getMainSchema = async () => {
    try {
        logger.debug('mainRepo.getMainSchema -- start');
        let main = await mainSchema.find(/*{_id:'62c58b6112e56b7fc9a654d5'}*/).populate({
            path: 'image'
        }).lean();
        logger.debug('mainRepo.getMainSchema -- success');
        return main
    } catch (error) {
        throw error
    }
}

module.exports={
     createMainContent,updateContent,findMainSchema,findMainImage,getMainSchema
}