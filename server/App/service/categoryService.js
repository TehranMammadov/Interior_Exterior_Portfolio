const { get } = require("../repository/categoryRepository.js");
const  language  = require("../language/language.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const { create, deleteCategory ,updateCategory} = require("../repository/categoryRepository.js");

const post = async (lang, body) => {
    logger.debug("categoryService.post  -- start");
    const { categoryName } = body;
    const category = await create({categoryName});
    if (!category) {
        logger.warn("categoryService.post  -- error");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    await category.save();
    return language[lang].categorySuccessfullyCreated; //
};

const getAll = async (lang) => {
    logger.debug("categoryController.getAll  -- start");
    const categories = get();
    if (categories.length === 0) {
        logger.warn("categoryController.getAll  -- not found");
        throw ApiError.NotFoundException(language[lang].categoryNotExists);
    }
    logger.debug("categoryController.getAll  -- success");
    return categories;
};

const update = async (lang, body) => {
    logger.debug("categoryService.update  -- start");
    const { id, categoryName } = body;
    const updatedCategory = await updateCategory(id, categoryName);
    if (!updatedCategory) {
        logger.warn("categoryService.update  -- error");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug("categoryService.update  -- success");
    return language[lang].categorySuccessfullyUpdated;
};

const remove = async (lang, body) => {
    logger.debug("categoryController.delete  -- start");
    const { id } = body;
    const categories = await deleteCategory({_id:id});
    if (categories.length === 0) {
        logger.warn("categoryController.delete  -- not found");
        throw ApiError.NotFoundException(language[lang].categoryNotExists);
    }
    logger.debug("categoryController.delete  -- success");
    return language[lang].categorySuccessfullyDeleted;
};

module.exports = {
    post,
    getAll,
    update,
    remove
};