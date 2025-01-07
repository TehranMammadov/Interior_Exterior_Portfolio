const categoryService = require("../service/categoryService.js");
const logger = require("../logger/index.js");
const checkLanguage = require("../utill/accept_language");

const addCategory = async (req, res, next) => {
    logger.debug("categoryController.addCategory  -- start");
    let lang = checkLanguage(req);
    try {
        const result = await categoryService.post(lang, req.body);
        logger.debug("categoryController.addCategory");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    logger.debug("categoryController.getCategories  -- start");
    let lang = checkLanguage(req);
    try {
        const result = await categoryService.getAll(lang);
        logger.debug("categoryController.getPortfolios  -- success");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    logger.debug("categoryController.updateCategory -- start");
    let lang = checkLanguage(req);
    try {
        const result = await categoryService.update(lang, req.body);
        logger.debug("categoryController.updateCategory -- success");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    logger.debug("categoryController.deleteCategory -- start");
    let lang = checkLanguage(req);
    try {
        const result = await categoryService.remove(lang, req.body);
        logger.debug("categoryController.deleteCategory -- success");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addCategory,getCategories,updateCategory,deleteCategory
}