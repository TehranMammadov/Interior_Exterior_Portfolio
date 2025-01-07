const aboutSchema = require("../models/aboutSchema.js");
const aboutContentSchema = require("../models/aboutContentSchema.js");
const moduleSchema= require("../models/moduleSchema.js");
const logger = require("../logger/index");

 const createAbout = async (query)=>{
    try {
        logger.debug('aboutRepo.createAbout -- start');
        const schema = await aboutSchema.create(query);
        await schema.save();
        logger.debug('aboutRepo.createAbout -- success');
        return schema;
    } catch (error) {
        throw error
    }
}

 const updateAbout = async (id,query)=>{
    try {
        logger.debug('aboutRepo.createAbout -- start');
        const schema = await aboutSchema.findOneAndUpdate(id,query);
        await schema.save();
        logger.debug('aboutRepo.createAbout -- success');
        return schema;
    } catch (error) {
        throw error
    }
}

 const createContent = async (query)=>{
    try {
        logger.debug('aboutRepo.createContent -- start');
        const schema = await aboutContentSchema.create(query);
        logger.debug('aboutRepo.createContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}

 const findContent = async (query)=>{
    try {
        logger.debug('aboutRepo.findContent -- start');
        const schema = await aboutContentSchema.findOne(query);
        logger.debug('aboutRepo.findContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}

 const updateContent = async (id,query)=>{
    try {
        logger.debug('aboutRepo.updateContent -- start');
        const schema = await aboutContentSchema.findByIdAndUpdate(id,{image: query});
        logger.debug('aboutRepo.updateContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}

 const updateModule = async (id,query)=>{
    try {
        logger.debug('aboutRepo.updateModule -- start');
        const schema = await moduleSchema.findByIdAndUpdate(id,query);
        logger.debug('aboutRepo.updateModule -- success');
        return schema
    } catch (error) {
        throw error
    }
}



const removeModule = async (id)=>{
    try {
        logger.debug('aboutRepo.removeModule -- start');
        const schema = await moduleSchema.findOneAndDelete({_id:id});
        await aboutSchema.updateOne(
            {module: {$in: [schema._id]}},
            {$pull: {module: schema._id}},
            {multi: true})
        logger.debug('aboutRepo.removeModule -- success');
        return schema
    } catch (error) {
        throw error
    }
}


 const createModule = async (query)=>{
    try {
        logger.debug('aboutRepo.createContent -- start');
        const schema = await moduleSchema.create(query);
        logger.debug('aboutRepo.createContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}


const getAbout = async ()=>{
    try {
        logger.debug('aboutRepo.getAbout -- start');
        const schema = await aboutSchema.find(/*{_id:'62b96db55c5e3fa28a0edce7'}*/)
            .populate('headerImage')
            //.populate('content')
            .populate({path:'content',populate:{path:'image'}});
        logger.debug('aboutRepo.getAbout -- success');
        return schema
    } catch (error) {
        throw error
    }
}


const getAboutById = async (id)=>{
    try {
        logger.debug('aboutRepo.getAbout -- start');
        const schema = await aboutSchema.findById({_id:id})
            .populate('headerImage')
            //.populate('content')
            .populate({path:'content',populate:{path:'image'}});
        logger.debug('aboutRepo.getAbout -- success');
        return schema
    } catch (error) {
        throw error
    }
}

module.exports ={
     removeModule,createAbout,createModule,createContent,updateAbout,getAbout,updateModule,updateContent,findContent, getAboutById
}