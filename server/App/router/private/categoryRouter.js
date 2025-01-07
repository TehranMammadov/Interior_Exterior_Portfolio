const express = require("express");
const {addCategory, updateCategory, deleteCategory } = require("../../controller/categoryController.js");
const authMiddleware= require("../../middleware/authMiddleware.js");
const refreshMiddleware= require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");

const route = express.Router();
route.use(authMiddleware,refreshMiddleware)
route.post("/",validation.categoryPostOption,validationErrorMiddleware.checkErrors,addCategory);
route.patch("/update",validation.categoryPatchOption,validationErrorMiddleware.checkErrors,updateCategory);
route.delete("/delete",validation.categoryRemoveOption,validationErrorMiddleware.checkErrors, deleteCategory);

module.exports= route;