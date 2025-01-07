const express = require('express');
const {uploadImages}= require('../../service/multerService.js');
const {addBlog,deleteBlog,updateBlog} = require('../../controller/blogController.js');
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware = require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");

//Express router
const route = express.Router()
route.use(authMiddleware,refreshMiddleware)
route.post('/',validation.blogPostOption,validationErrorMiddleware.checkErrors,uploadImages, addBlog)
route.patch('/',validation.blogPatchOption,validationErrorMiddleware.checkErrors,uploadImages, updateBlog)
route.delete('/',validation.blogRemoveOption,validationErrorMiddleware.checkErrors,deleteBlog)


module.exports= route;