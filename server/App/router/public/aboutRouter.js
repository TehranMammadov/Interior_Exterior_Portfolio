const express = require('express');
const {getAbout} = require('../../controller/aboutController.js');

//Express router
const route = express.Router()

route.get('/', getAbout)

 module.exports=route;