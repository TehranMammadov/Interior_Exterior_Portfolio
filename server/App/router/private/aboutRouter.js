const express = require("express");
const { uploadImages } = require("../../service/multerService.js");
const {
  addAboutContent,
  updateAbout,
  updateAboutContent,
  updateModule,
    deleteModules,
    addModules
} = require("../../controller/aboutController.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware= require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");

//Express router
const route = express.Router();
route.use(authMiddleware, refreshMiddleware, validation.languageOption);
route.post(
  "/",
  uploadImages,
  validation.aboutPostOption,
  validationErrorMiddleware.checkErrors,
  addAboutContent
);
route.patch(
  "/",
  uploadImages,
  validation.aboutPatchOption,
  validationErrorMiddleware.checkErrors,
  updateAbout
);
route.patch(
  "/content/:id",
  uploadImages,
  validation.aboutContentPatchOption,
  validationErrorMiddleware.checkErrors,
  updateAboutContent
);


/*route.post(
    "/module/:id",
    validation.aboutModulePatchOption,
    validationErrorMiddleware.checkErrors,
    addModules
);

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
);*/


module.exports= route;
