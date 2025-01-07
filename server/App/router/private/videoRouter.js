const express = require('express');
const {addVideo, updateVideo, deleteVideo} = require('../../controller/videoController.js');
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware = require("../../middleware/refreshMiddleware.js");
const validation = require("../../validation/validationRouter");
const validationErrorMiddleware = require("../../middleware/validationMiddleware");

//Express router
const route = express.Router()
route.use(authMiddleware,refreshMiddleware)
route.post('/', validation.videoPostOption, validationErrorMiddleware.checkErrors, addVideo)
route.patch('/', validation.videoPatchOption, validationErrorMiddleware.checkErrors, updateVideo)
route.delete('/:id', validation.videoDeleteAndGetOption, validationErrorMiddleware.checkErrors, deleteVideo)

module.exports= route;