const express = require('express');
const {uploadImages} = require('../../service/multerService.js');
const {addModules,addPortfolio,deletePortfolio,updatePortfolio,updateModule,deleteModules} = require('../../controller/portfolioController.js');
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware = require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");


//Express router
const route = express.Router()
route.use(authMiddleware,refreshMiddleware)
route.post('/',validation.portfolioPostOption,validationErrorMiddleware.checkErrors,uploadImages, addPortfolio)
route.patch('/',validation.portfolioPatchOption,validationErrorMiddleware.checkErrors,uploadImages, updatePortfolio)
route.delete('/',validation.portfolioRemoveOption,validationErrorMiddleware.checkErrors,deletePortfolio)
/*route.patch(
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
);*/

module.exports= route;