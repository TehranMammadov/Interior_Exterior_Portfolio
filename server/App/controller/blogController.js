const blogService = require("../service/blogService.js");
const logger = require("../logger/index.js");
const {removeImage} = require("../utill/removeImage.js");
const checkLanguage = require("../utill/accept_language");


 const addBlog = async (req, res, next) => {
  logger.debug('blogController.addBlog -- start');
  let lang = checkLanguage(req);
     console.log(req.body)

  try {
    const result = await blogService.post(req.body,req.files,lang);
    logger.debug('blogController.addBlog -- success');
    res.send({ result });
  } catch (error) {
    if (req.files){
      await removeImage(req.files);
    }
    next(error);
  }
};



 const updateBlog = async (req, res, next) => {
  try{
  logger.debug('blogController.updateBlog  -- start');
    let lang = checkLanguage(req);
    const result = await blogService.update(req.body,req.files,lang);
    logger.debug('blogController.updateBlog -- success');
    res.status(201).send({ result });
  } catch (error) {
    if (req.files){
      await removeImage(req.files);
    }
    next(error);
  }
};


 const getBlogs = async (req, res, next) => {
  try {
    logger.debug('blogController.getBlogs -- start');
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    const result = await blogService.getAll(lang, getLang)
    res.status(200).send({result})
    logger.debug('blogController.getBlogs -- success');
  } catch (error) {
    next(error);
  }
};

 const getBlogsByCategory = async (req, res, next) => {
  try {
    logger.debug('blogController.getBlogsByCategory -- start');
    let lang = checkLanguage(req);
    const {category} = req.params;
    const result = await blogService.blogsByCategory(lang,category)
    res.status(200).send({result})
    logger.debug('blogController.getBlogsByCategory -- success');
  } catch (error) {
    next(error);
  }
};

 const getBlog = async (req, res, next) => {
  try {
    logger.debug('blogController.getBlogs -- start');
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    const {id} = req.params;
    const result = await blogService.getBlogById(lang,id, getLang)
    res.status(200).send({result})
    logger.debug('blogController.getBlogs -- success');
  } catch (error) {
    next(error);
  }
};

 const getBlogBySlug = async (req, res, next) => {
  try {
    logger.debug('blogController.getBlogBySlug  -- start');
    let lang = checkLanguage(req);
    const {slug} = req.params
    const response = await blogService.getFiltered({slug: slug},lang)
    logger.debug('blogController.getBlogBySlug  -- success');
      res.status(200).send({response});
  } catch (error) {
    next(error)
  }
};

 const deleteBlog = async (req, res, next) => {
  try {
    logger.debug('blogController.deleteBlog -- start');
    let lang = checkLanguage(req);
    if (!lang) {
      lang = 'en'
    }
    const id = req.body.id
    const response = await blogService._delete(id,lang)
    logger.debug('blogController.deleteBlog -- success');
    res.status(200).send({response})
  } catch (error) {
    next(error);
  }
};


module.exports={
  deleteBlog,getBlogBySlug,getBlogsByCategory,getBlog,
  addBlog,updateBlog,getBlogs
}