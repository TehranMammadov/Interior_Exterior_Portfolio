const express = require('express');
const {register, login, logout}= require("../../controller/userController.js");
const validation = require("../../validation/validationRouter.js");
const validationErrorMiddleware = require("../../middleware/validationMiddleware.js");
const authMiddleware= require("../../middleware/authMiddleware.js");
const refreshMiddleware = require("../../middleware/refreshMiddleware.js");


const route = express.Router()

route.post('/login',validation.loginOption,validationErrorMiddleware.checkErrors,login);
route.post('/registration',validation.registrationOption,validationErrorMiddleware.checkErrors,register);
route.post('/logout',authMiddleware,refreshMiddleware,logout);

module.exports=route