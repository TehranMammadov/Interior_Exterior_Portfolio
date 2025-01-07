const express= require("express");
const {upload,remove} = require("../../controller/fileController.js");
const route = express.Router()
const multer = require("../../service/multerService.js");
const authMiddleware = require("../../middleware/authMiddleware.js");
const refreshMiddleware = require("../../middleware/refreshMiddleware.js");

route.use(authMiddleware,refreshMiddleware);
route.post('/upload',multer.uploadImages, upload)
route.delete('/remove',remove)



module.exports= route;