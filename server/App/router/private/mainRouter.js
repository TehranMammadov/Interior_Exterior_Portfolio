const express= require('express');
const {uploadImages} = require('../../service/multerService.js');
const {addMainHeader,updateMainHeader}= require('../../controller/mainController.js');
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware= require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const  validationErrorMiddleware = require("../../middleware/validationMiddleware.js");

//Express router
const route = express.Router()
route.use(authMiddleware,refreshMiddleware)
route.post('/',validation.mainPostOption,validationErrorMiddleware.checkErrors,uploadImages, addMainHeader)
route.patch('/',uploadImages,validation.mainPatchOption,validationErrorMiddleware.checkErrors, updateMainHeader)




module.exports=route;