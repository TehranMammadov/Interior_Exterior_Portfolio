const interiorSchema = require('../models/interiorSchema.js');
const logger = require("../logger/index.js");
const portfolioSchema = require("../models/portfolioSchema.js");
const moduleSchema = require("../models/moduleSchema.js");
const aboutSchema = require("../models/aboutSchema.js");


const create = async (query) => {
    try {
        logger.debug('InteriorRepo.create -- start');
        const interior = await interiorSchema.create(query);
        await interior.save()
        logger.debug('InteriorRepo.create -- success');
        return interior;
    } catch (error) {
        throw error
    }
}


const get = async () => {
    try {
        logger.debug('InteriorRepo.get -- start');
        let interior = await interiorSchema.find()
            .populate('category')
            .populate('posterImage')
            .populate('footerImage')
            .populate('module')
            .lean()
        logger.debug('InteriorRepo.get -- success');
        return interior;
    } catch (error) {
        throw error
    }
}


const getInteriorsByCategory = async (category) => {
    try {
        logger.debug('InteriorRepo.getPortfoliosByCategory -- start');
        let interior = await interiorSchema.find({category: category})
            .populate('category')
            .populate('posterImage')
            .populate('footerImage')
            .populate('module')
            .lean()
        logger.debug('InteriorRepo.getPortfoliosByCategory -- success');
        return interior;
    } catch (error) {
        throw error
    }
}


const getInterior = async (id) => {
    try {
        logger.debug('InteriorRepo.getPortfolio -- start');
        let interior = await interiorSchema.findById(id)
            .populate('category')
            .populate('posterImage')
            .populate('footerImage')
            .populate('module')
            .lean()
        logger.debug('InteriorRepo.getPortfolio -- success');
        return interior;
    } catch (error) {
        throw error
    }
}




const updateInteriorById = async (id, query) => {
    try {
        logger.debug('InteriorRepo.updatePortfolioById -- start');
        const interior = await interiorSchema.findByIdAndUpdate(id, {$set: query});
        logger.debug('InteriorRepo.updatePortfolioById -- success');
        return interior
    } catch (error) {
        throw error
    }
}


const deleteOne = async (id) => {
    try {
        logger.debug('InteriorRepo.deleteOne -- start');
        const interior = await interiorSchema.findByIdAndDelete({_id: id}).populate('posterImage').populate('footerImage');
        logger.debug('InteriorRepo.deleteOne -- success');
        return interior
    } catch (error) {
        throw error
    }
}



const updatePosterImage = async (id, arr) => {
    try {
        logger.debug('InteriorRepo.updatePosterImage -- start');
        const image = await interiorSchema.findOne({_id: id});
        for (const id1 of arr) {
            image.posterImage.push(id1);
            await image.save();
        }
        logger.debug('InteriorRepo.updatePosterImage -- success');
        return image
    } catch (error) {
        throw error
    }
}




const findInterior = async (id) => {
    try {
        logger.debug('InteriorRepo.findPortfolio -- start');
        const content = await interiorSchema.findOne({
            _id: id
        }).populate('category').populate('module');
        logger.debug('InteriorRepo.findPortfolio -- success');
        return content
    } catch (error) {
        throw error
    }
}


const getOne = async (filter,state = 'lean') => {
    try {
        logger.debug('InteriorRepo.getOne -- start');
        let interior = undefined
        if(state === 'lean'){
            interior = await interiorSchema.findOne(filter).populate('category').lean()
        }else{
            interior = await interiorSchema.findOne(filter).populate('category')
        }
        logger.debug('InteriorRepo.getOne -- success');
        return interior
    } catch (error) {
        throw error
    }
}


const removeModule = async (id)=>{
    try {
        logger.debug('interiorRepo.remove -- start');
        const schema = await moduleSchema.findOneAndDelete({_id:id});
        await interiorSchema.updateOne(
            {module: {$in: [schema._id]}},
            {$pull: {module: schema._id}},
            {multi: true})
        logger.debug('interiorRepo.remove -- success');
        return schema
    } catch (error) {
        throw error
    }
}


const updateModule = async (id,query)=>{
    try {
        logger.debug('InteriorRepo.updateModule -- start');
        const schema = await moduleSchema.findByIdAndUpdate(id,query);
        logger.debug('InteriorRepo.updateModule -- success');
        return schema
    } catch (error) {
        throw error
    }
}


const createModule = async (query)=>{
    try {
        logger.debug('InteriorRepo.createContent -- start');
        const schema = await moduleSchema.create(query);
        logger.debug('InteriorRepo.createContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}


module.exports = {
    createModule,
    updateModule,
    removeModule,
    create,
    updateInteriorById,
    updatePosterImage,
    deleteOne,
    findInterior,
    getInterior,
    getInteriorsByCategory,
    get,
    getOne
}