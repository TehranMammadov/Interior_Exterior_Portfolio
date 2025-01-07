const  express = require('express');
const {getMessageList} = require("../../controller/messageController.js");
const route = express.Router();
const authMiddleware = require('../../middleware/authMiddleware.js');
const refreshMiddleware = require('../../middleware/refreshMiddleware.js');
route.use(authMiddleware,refreshMiddleware)
route.get('/:skip/:limit',getMessageList)
module.exports= route;