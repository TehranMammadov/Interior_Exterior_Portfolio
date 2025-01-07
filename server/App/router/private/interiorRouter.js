const express= require('express');
const {uploadImages} = require('../../service/multerService.js');
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware= require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const  validationErrorMiddleware = require("../../middleware/validationMiddleware.js");
const {addModules,addInterior, updateInterior, deleteInterior,updateModule,deleteModules} = require("../../controller/interiorController");



//Express router
const route = express.Router()
route.use(authMiddleware,refreshMiddleware)
route.post('/',validation.portfolioPostOption,validationErrorMiddleware.checkErrors,uploadImages, addInterior)
route.patch('/',validation.portfolioPatchOption,validationErrorMiddleware.checkErrors,uploadImages, updateInterior)
route.delete('/',validation.portfolioRemoveOption,validationErrorMiddleware.checkErrors,deleteInterior)
route.patch(
    "/module/:id",
    validation.aboutModulePatchOption,
    validationErrorMiddleware.checkErrors,
    updateModule
);
route.delete(
    "/module/:id",
    validation.aboutModulePatchOption,
    validationErrorMiddleware.checkErrors,
    deleteModules
);

route.post(
    "/module/:id",
    validation.aboutModulePatchOption,
    validationErrorMiddleware.checkErrors,
    addModules
);

module.exports=route;