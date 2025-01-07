const express = require('express');
const {getPortfolios,getPortfolio} = require('../../controller/portfolioController.js');
const {getPortfoliosByCategory}= require("../../controller/portfolioController.js");

//Express router
const route = express.Router()


route.get('/',getPortfolios)
route.get('/:id',getPortfolio)
route.get('/category/:category',getPortfoliosByCategory)



module.exports= route;