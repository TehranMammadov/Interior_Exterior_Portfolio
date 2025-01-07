const express = require('express');
const {getVideos,getVideo} = require('../../controller/videoController.js');

//Express router
const route = express.Router()

route.get('/', getVideos)
route.get('/:id', getVideo)



module.exports= route;