const blogModel = require('../models/blogSchema.js');
const logger= require("../logger/index.js");
const imageSchema = require("../models/imageSchema.js");

 const create = async (query) => {
    try {
        logger.debug('blogRepo.create -- start');
        const blog = await blogModel.create(query)
        await blog.save();
        logger.debug('blogRepo.create -- success');
        return blog
    } catch (error) {
        throw error
    }
}






 const get = async (filterObject = {}) => {
    try {
        logger.debug('blogRepo.get -- start');
        let blogs = await blogModel.find(filterObject)
            //.populate('category')
            .populate('posterImage')
            .lean();
        logger.debug('blogRepo.get -- success');
        return blogs
    } catch (error) {
        throw error
    }
}


 const findBlogsByCategory = async (category) => {
    try {
        logger.debug('blogRepo.findBlogsByCategory -- start');
        let blogs = await blogModel.find({category: category}).populate('category').populate('posterImage').lean();
        logger.debug('blogRepo.findBlogsByCategory -- success');
        return blogs
    } catch (error) {
        throw error
    }
}


  const getOne = async (filter, state = 'lean') => {
    try {
        logger.debug('blogRepo.getOne -- start');
        let blog = undefined
        if (state === 'lean') {
            blog = await blogModel.findOne(filter)//.populate('category')
                .lean()
        } else {
            blog = await blogModel.findOne(filter)//.populate('category')
        }
        logger.debug('blogRepo.getOne -- success');
        return blog
    } catch (error) {
        throw error
    }
}

  const getbyId = async (id) => {
    try {
        logger.debug('blogRepo.getById -- start');
        let blog = await blogModel.findById(id)//.populate('category')
            .populate('posterImage')
            .lean();
        logger.debug('blogRepo.getById -- success');
        return blog
    } catch (error) {
        throw error
    }
}

  const updateOne = async (id, query) => {
    try {
        console.log(query)
        logger.debug('blogRepo.updateOne -- start');
        const blog = await blogModel.findByIdAndUpdate({_id: id}, {
            $set: query
        });
        logger.debug('blogRepo.updateOne -- success');
        return blog
    } catch (error) {
        throw error
    }
}

  const deleteOne = async (id) => {
    try {
        logger.debug('blogRepo.deleteOne -- start');
        const blog = await blogModel.findByIdAndDelete({_id: id}).populate('posterImage');
        console.log(blog)
        logger.debug('blogRepo.deleteOne -- success');
        return blog
    } catch (error) {
        throw error
    }
}

  const deleteContent = async (id) => {
    try {
        logger.debug('blogRepo.deleteOne -- start');
        const _blog = await blogDesignSchema.deleteOne({blogId: id});
        logger.debug('blogRepo.deleteOne -- success');
        return _blog
    } catch (error) {
        throw error
    }
}

  const findContent = async (id) => {
    try {
        logger.debug('blogRepo.findContent -- start');
        const content = await blogDesignSchema.findOne({
            _id: id
        });
        logger.debug('blogRepo.findContent -- success');
        return content
    } catch (error) {
        throw error
    }
}

 const findBlog = async (id) => {
    try {
        logger.debug('blogRepo.findBlog -- start');
        const content = await blogModel.findOne({
            _id: id
        })//.populate('category');
        logger.debug('blogRepo.findBlog -- success');
        return content
    } catch (error) {
        throw error
    }
}


  const createImage = async (url) => {
    try {
        logger.debug('blogRepo.createImage -- start');
        const image = await imageSchema.create({
            url: url
        });
        await image.save();
        logger.debug('blogRepo.createImage -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const findImage = async (url) => {
    try {
        logger.debug('blogRepo.findImage -- start');
        const image = await imageSchema.findOne({
            url: url
        });
        logger.debug('blogRepo.findImage -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const findImageById = async (id) => {
    try {
        logger.debug('blogRepo.findImageById -- start');
        const image = await imageSchema.findOne({
            _id: id
        });
        logger.debug('blogRepo.findImageById -- success');
        return image
    } catch (error) {
        throw error
    }
}


 const findAndUpdateImageById = async (id, query) => {
    try {
        logger.debug('blogRepo.findAndUpdateImageById -- start');
        const image = await imageSchema.findByIdAndUpdate(id, query);
        logger.debug('blogRepo.findAndUpdateImageById -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const removeImageById = async (id) => {
    try {
        logger.debug('blogRepo.removeImageById -- start');
        const image = await imageSchema.findOneAndDelete({
            _id: id
        });
        logger.debug('blogRepo.removeImageById -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const updatePosterImage = async (id, arr) => {
    try {
        logger.debug('blogRepo.updatePosterImage -- start');
        const image = await blogModel.findOne({_id: id});
        for (const id1 of arr) {
            image.posterImage.push(id1);
            await image.save();
        }
        logger.debug('blogRepo.updatePosterImage -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const updateHeaderImage = async (id, arr) => {
    try {
        logger.debug('blogRepo.updateHeaderImage -- start');
        const image = await blogDesignSchema.findOne({_id: id});
        for (const id1 of arr) {
            image.headerImage.push(id1);
            await image.save();
        }
        logger.debug('blogRepo.updateHeaderImage -- success');
        return image
    } catch (error) {
        throw error
    }
}


  const updateFooterImage = async (id, arr) => {
    try {
        logger.debug('blogRepo.updateFooterImage -- start');
        const image = await blogDesignSchema.findOne({_id: id});
        for (const id1 of arr) {
            image.footerImage.push(id1);
            await image.save();
        }
        logger.debug('blogRepo.updateFooterImage -- success');
        return image
    } catch (error) {
        throw error
    }
}

module.exports={
     updatePosterImage,updateOne,updateHeaderImage,updateFooterImage,
    removeImageById,deleteContent,deleteOne,findImage,findBlog,findImageById,findBlogsByCategory,findAndUpdateImageById,
    get,getOne,getbyId,create,createImage,findContent

}