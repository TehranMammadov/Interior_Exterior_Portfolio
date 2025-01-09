const express = require('express');
const {getRoleList, createRole,auth} = require("../../controller/userController.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware= require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");

const route = express.Router()
// route.use(authMiddleware,refreshMiddleware)
route.post('/role',validation.roleOption,validationErrorMiddleware.checkErrors,createRole);
route.get('/role',getRoleList);
module.exports= route