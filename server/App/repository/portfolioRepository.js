const portfolioSchema = require('../models/portfolioSchema.js');
const logger = require("../logger/index.js");
const moduleSchema = require("../models/moduleSchema.js");




 const create = async (query) => {
    try {
        logger.debug('portfolioRepo.create -- start');
        const _portfolio = await portfolioSchema.create(query);
        await _portfolio.save()
        logger.debug('portfolioRepo.create -- success');
        return _portfolio
    } catch (error) {
        throw error
    }
}



 const get = async () => {
    try {
        logger.debug('blogService.get -- start');
        let portfolios = await portfolioSchema.find({})
            //.populate('category')
            .populate('module')
            .populate('posterImage')
            .populate('footerImage')
            .lean()
        logger.debug('blogService.get -- success');
        return portfolios
    } catch (error) {
        throw error
    }
}



 const getPortfoliosByCategory = async (category) => {
    try {
        logger.debug('blogService.getPortfoliosByCategory -- start');
        let portfolios = await portfolioSchema.find({category:category})
            .populate('category')
            .populate('posterImage')
            .populate('footerImage')
            .lean()
        logger.debug('blogService.getPortfoliosByCategory -- success');
        return portfolios
    } catch (error) {
        throw error
    }
}



 const getPortfolio = async (id) => {
    try {
        logger.debug('blogService.getPortfolio -- start');
        let portfolios =  await portfolioSchema.findById(id)
            /*.populate('category')*/
            .populate('posterImage')
            .populate('footerImage')
            .populate('module')
            .lean()
        logger.debug('blogService.getPortfolio -- success');
        return portfolios
    } catch (error) {
        throw error
    }
}

 const getOne = async (filter,state = 'lean') => {
    try {
        logger.debug('blogService.getOne -- start');
        let work = undefined
        if(state === 'lean'){
            work = await portfolioSchema.findOne(filter)
                //.populate('category')
                //.populate('module')
                .lean()
        }else{
            work = await portfolioSchema.findOne(filter).populate('category')
        }
        logger.debug('blogService.getOne -- success');
        return work
    } catch (error) {
        throw error
    }
}

 const getbyId = async (id, state = 'lean') => {
    try {
        logger.debug('blogService.getbyId -- start');
        let work = undefined
        if(state === 'lean'){work = await portfolioSchema.findById(id)
            //.populate('category')
            //.populate('module')
            .lean()}else{work = await portfolioSchema.findById(id)
            //.populate('category')
            //.populate('module')
        }
        logger.debug('blogService.getbyId -- success');
        return work
    } catch (error) {
        throw error
    }
}

 const updateOne = async (id,updates) => {
    try {
        logger.debug('blogService.updateOne -- start');
        const work = await portfolioSchema.findByIdAndUpdate(id, { $set: updates}).lean();
        logger.debug('blogService.updateOne -- success');
        return work
    } catch (error) {
        throw error
    }
}


 const updatePortfolioById = async (id,query) => {
    try {
        logger.debug('portfolioRepo.updatePortfolioById -- start');
        const portfolio = await portfolioSchema.findByIdAndUpdate(id, { $set: query});
        logger.debug('portfolioRepo.updatePortfolioById -- success');
        return portfolio
    } catch (error) {
        throw error
    }
}




 const deleteOne = async (id) => {
    try {
        logger.debug('portfolioRepo.deleteOne -- start');
        const portfolio = await portfolioSchema.findByIdAndDelete({_id:id}).populate('posterImage').populate('footerImage');
        logger.debug('portfolioRepo.deleteOne -- success');
        return portfolio
    } catch (error) {
        throw error
    }
}

//  const deletePortfolioDesign = async (id) => {
//     try {
//         logger.debug('portfolioRepo.deletePortfolioDesign -- start');
//         const design = await portfolioDesignSchema.deleteOne({portfolioId:id});
//         logger.debug('portfolioRepo.deletePortfolioDesign -- success');
//         return design
//     } catch (error) {
//         throw error
//     }
// }



 const updatePosterImage = async (id,arr) => {
    try {
        logger.debug('portfolioRepo.updatePosterImage -- start');
        const image = await portfolioSchema.findOne({_id:id});
        for (const id1 of arr) {
            image.posterImage.push(id1);
            await image.save();
        }
        logger.debug('portfolioRepo.updatePosterImage -- success');
        return image
    } catch (error) {
        throw error
    }
}

//
// const updateHeaderImage = async (id,arr) => {
//     try {
//         logger.debug('portfolioRepo.updateHeaderImage -- start');
//         const image = await portfolioDesignSchema.findOne({_id:id});
//         for (const id1 of arr) {
//             image.headerImage.push(id1);
//             await image.save();
//         }
//         logger.debug('portfolioRepo.updateHeaderImage -- success');
//         return image
//     } catch (error) {
//         throw error
//     }
// }
//
//
//
// const updateFooterImage = async (id,arr) => {
//     try {
//         logger.debug('portfolioRepo.updateFooterImage -- start');
//         const image = await portfolioDesignSchema.findOne({_id:id});
//         for (const id1 of arr) {
//             image.footerImage.push(id1);
//             await image.save();
//         }
//         logger.debug('portfolioRepo.updateFooterImage -- success');
//         return image
//     } catch (error) {
//         throw error
//     }
// }
//
//
//  const updateAfterParagraphImage = async (id,arr) => {
//     try {
//         logger.debug('portfolioRepo.updateAfterParagraphImage -- start');
//         const image = await portfolioDesignSchema.findOne({_id:id});
//         for (const id1 of arr) {
//             image.imageAfterParagraph.push(id1);
//             await image.save();
//         }
//         logger.debug('portfolioRepo.updateAfterParagraphImage -- success');
//         return image
//     } catch (error) {
//         throw error
//     }
// }



 const findPortfolio = async (id) => {
    try {
        logger.debug('portfolioRepo.findPortfolio -- start');
        const content = await portfolioSchema.findOne({
            _id : id
        })/*.populate('category')*/.populate('module');
        logger.debug('portfolioRepo.findPortfolio -- success');
        return content
    } catch (error) {
        throw error
    }
}


const updateModule = async (id,query)=>{
    console.log("QUERY",query);
    try {
        logger.debug('portfolioRepo.updateModule -- start');
        const schema = await moduleSchema.findByIdAndUpdate({_id: id}, {$set:query});
        logger.debug('portfolioRepo.updateModule -- success');
        return schema
    } catch (error) {
        throw error
    }
}

const removeModule = async (id)=>{
    try {
        logger.debug('portfolioRepo.removeModule -- start');
        const schema = await moduleSchema.findOneAndDelete({_id:id});
        await portfolioSchema.updateOne(
            {module: {$in: [schema._id]}},
            {$pull: {module: schema._id}},
            {multi: true})
        logger.debug('portfolioRepo.removeModule -- success');
        return schema
    } catch (error) {
        throw error
    }
}


const createModule = async (query)=>{
    try {
        logger.debug('portfolioRepo.createContent -- start');
        console.log(query)
        const schema = await moduleSchema.create(query);
        logger.debug('portfolioRepo.createContent -- success');
        return schema
    } catch (error) {
        throw error
    }
}


module.exports={
     createModule,removeModule,updateModule,create,updateOne,updatePortfolioById,updatePosterImage,
    deleteOne,findPortfolio,getPortfolio,getOne,getPortfoliosByCategory,getbyId,get
}