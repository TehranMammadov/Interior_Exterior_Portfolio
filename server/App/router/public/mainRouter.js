const express= require('express');
const {getMainHeader} = require('../../controller/mainController.js');


//Express router
const route = express.Router()

route.get('/', getMainHeader)



module.exports= route;