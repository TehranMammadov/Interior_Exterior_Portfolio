const express = require("express");
const { getCategories} = require("../../controller/categoryController.js");

const route = express.Router();
route.get("/", getCategories);
module.exports=route;