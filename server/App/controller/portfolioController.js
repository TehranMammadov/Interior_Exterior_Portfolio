const portfolioService = require("../service/portfolioService.js");
const logger = require("../logger/index.js");
const {removeImage} = require("../utill/removeImage.js");
const checkLanguage = require("../utill/accept_language");
const {editModule, deleteModule, addModuleToPortfolio} = require("../service/portfolioService");


 const addPortfolio = async (req, res, next) => {
  logger.debug('PortfolioController.addPortfolio  -- start');
  let lang =checkLanguage(req);
  try {
    const result = await portfolioService.post(lang,req.body,req.files);
    logger.debug('PortfolioController.addPortfolio  -- success');
    res.send({ result });
  } catch (error) {
    if (req.files){
      await removeImage(req.files);
    }
    console.log(error)
    next(error);
  }
};



const updatePortfolio = async (req, res, next) => {
  logger.debug('blogController.updatePortfolio -- start');
  let lang = checkLanguage(req);
  try {
    const result = await portfolioService.update(lang,req.body,req.files);
    logger.debug('blogController.updatePortfolio -- success');
    res.send({ result });
  } catch (error) {
    if (req.files){
      await removeImage(req.files);
    }
    next(error);
  }
};



const getPortfolios = async (req, res, next) => {
  try {
    logger.debug('blogController.getPortfolios -- start');
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    const result = await portfolioService.getAll(lang, getLang);
    logger.debug('blogController.getPortfolios -- success');
    res.send({result});
  } catch (error) {
    next(error);
  }
};


 const getPortfoliosByCategory = async (req, res, next) => {
  try {
    logger.debug('blogController.getPortfolios -- start');
    let lang = checkLanguage(req);
    const {category} = req.params;
    const result = await portfolioService.portfoliosByCategory(lang,category);
    logger.debug('blogController.getPortfolios -- success');
    res.send({result});
  } catch (error) {
    next(error);
  }
};



 const getPortfolio = async (req, res, next) => {
  try {
    logger.debug('blogController.getPortfolios -- start');
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    const {id} = req.params;
    const response = await portfolioService.getPortfolioById(lang,id, getLang);
    logger.debug('blogController.getPortfolios -- success');
    res.send({response});
  } catch (error) {
    next(error);
  }
};

  const getPortfolioBySlug = async (req, res, next) => {
  try {
    logger.debug('blogController.getPortfolioBySlug -- start');
      let lang = checkLanguage(req);
      const {slug} = req.params;
      const response = await portfolioService.getFiltered({slug: slug},lang);
    logger.debug('blogController.getPortfolioBySlug -- success');
      res.send({response})
  } catch (error) {
    next(error);
  }
};

  const deletePortfolio = async (req, res, next) => {
  try {
    logger.debug('blogController.deletePortfolio -- start');
    let lang = checkLanguage(req);
    const {id} = req.body
    const response = await portfolioService._delete(id,lang);
    logger.debug('blogController.deletePortfolio -- success');
    res.send({response})
  } catch (error) {
    next(error);
  }
};


const updateModule = async (req, res, next) => {
  logger.debug('portfolioController.updateAboutModule -- start');
  let lang = checkLanguage(req);
  const {id} = req.params
  try {
    const result = await editModule(id,req.body,lang);
    logger.debug('portfolioController.updateAboutModule -- success');
    res.send({ result });
  } catch (error) {
    next(error);
  }
};


const deleteModules = async (req, res, next) => {
  logger.debug('portfolioController.deleteModules -- start');
  let lang = checkLanguage(req);
  const {id} = req.params
  try {
    const result = await deleteModule(id,lang);
    logger.debug('portfolioController.deleteModules -- success');
    res.send({ result });
  } catch (error) {
    next(error);
  }
};

const addModules = async (req, res, next) => {
  logger.debug('portfolioController.addModules -- start');
  const {id} = req.params
  let lang = checkLanguage(req);
  try {
    const result = await addModuleToPortfolio(id,req.body,lang);
    logger.debug('portfolioController.addModules -- success');
    res.send({ result });
  } catch (error) {
    next(error);
  }
};

module.exports={
  addModules,updateModule,deleteModules,addPortfolio,getPortfolioBySlug,getPortfoliosByCategory,getPortfolios,getPortfolio,deletePortfolio,updatePortfolio
}