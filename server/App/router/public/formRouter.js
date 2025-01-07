const express = require('express');
const {form} = require('../../controller/formController.js');
const validation= require('../../validation/validationRouter.js');
const validationMiddleware = require("../../middleware/validationMiddleware.js");

const route = express.Router()

route.post('/',validation.formValidationOption,validationMiddleware.checkErrors,form);

module.exports= route