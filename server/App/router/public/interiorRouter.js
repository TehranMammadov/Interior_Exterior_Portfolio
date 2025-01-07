const express = require('express');
const {form} = require('../../controller/formController.js');
const validation= require('../../validation/validationRouter.js');
const validationMiddleware = require("../../middleware/validationMiddleware.js");
const {getInteriors, getInterior, getInteriorsByCategory} = require("../../controller/interiorController");

const route = express.Router()

route.get('/',getInteriors)
route.get('/:id',getInterior)
route.get('/category/:category',getInteriorsByCategory)

module.exports= route