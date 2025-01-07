const express =require('express');
const {getBlog, getBlogs, getBlogsByCategory} = require('../../controller/blogController.js');


//Express router
const route = express.Router()
route.get('/',getBlogs)
route.get('/:id',getBlog)
route.get('/category/:category',getBlogsByCategory)



module.exports= route;