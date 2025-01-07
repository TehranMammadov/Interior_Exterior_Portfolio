const categorySchema = require("../models/categorySchema.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError");

 const create = async (query) => {
    try {
        logger.debug("categoryRepo.create  -- start");
        const _category = await categorySchema.create(query);
        await _category.save();
        logger.debug("categoryRepo.create  -- success");
        return _category;
    } catch (error) {
        throw error;
    }
};

 const get = async () => {
    try {
        logger.debug("categoryService.get  -- start");
        let categories = await categorySchema.find().lean();
        logger.debug("categoryService.get  -- success");
        return categories;
    } catch (error) {
        throw error;
    }
};

 const updateCategory = async (id, category) => {
    try {
        logger.debug("categoryRepo.update  -- start");
        const updatedCategory = await categorySchema.findOneAndUpdate(
            { _id: id },
            { categoryName: category }
        );
        if (!updatedCategory)
            throw ApiError.NotFoundException("Category not found");
        logger.debug("categoryRepo.update  -- success");
        return updatedCategory;
    } catch (e) {
        throw e;
    }
};
 const deleteCategory = async (id) => {
    try {
        logger.debug("categoryRepo.delete  -- start");
        const category = await categorySchema.deleteOne({ _id: id });
        if (category.deletedCount === 0)
            throw ApiError.NotFoundException("Category not found");
        logger.debug("categoryRepo.delete  -- success");
        return category;
    } catch (e) {
        throw e;
    }
};

 module.exports={
     create,get,updateCategory,deleteCategory
 }