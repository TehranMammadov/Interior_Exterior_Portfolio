const logger = require("../logger/index.js");
const {deleteOldImages}= require('../service/multerService.js');
const ApiError = require("../exceptions/apiError.js");
const fileService = require("../service/fileService");

const upload=async(req,res,next)=>{
    try {
        logger.debug("fileController.upload  -- start");
        let imagePath = process.env.URL + 'public/'+ req.file.filename;
        if (!imagePath){
            logger.warn("fileController.upload  -- null param");
            next(ApiError.GeneralException('Image path error'));
        }
        logger.debug("fileController.upload  -- success");
        res.status(200).send({
            success : 1,
            file: {
                url : imagePath,
            }
        });
    }catch (error){
        next(error)
    }
}

const remove=async(req,res,next)=>{
    try {
        logger.debug("fileController.remove  -- start");
        const {id} = req.body;
        let msg;
        let arr =[]
        const data =  await fileService.removeFileFromDb(id);
        for (const datum of data.footerImage) {
            if (`${datum._id}` === id){
               arr.push(datum.url)
            }
        }
            if (arr.length > 0) {
                await deleteOldImages(arr);
                msg = 'removed'
            } else {
                logger.warn("fileController.remove  -- null param");
                return next(ApiError.BadRequest('Image url not founded'));
            }
        logger.debug("fileController.remove  -- success")
        res.status(200).send(msg);
    }catch (error){
        next(error)
    }
}

module.exports = {
    upload,
    remove
}