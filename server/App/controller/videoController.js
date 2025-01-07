const videoService = require("../service/videoService.js");
const logger = require("../logger/index.js");
const checkLanguage = require("../utill/accept_language");
const categoryService = require("../service/categoryService");

const addVideo = async (req, res, next) => {
    logger.debug("videoController.addVideo  -- start");
    let lang = checkLanguage(req);
    try {
        const result = await videoService.post(lang, req.body);
        logger.debug("videoController.addVideo");
        res.status(200).send({message:result});
    } catch (error) {
        next(error);
    }
};

const updateVideo = async (req, res, next) => {
    logger.debug("videoController.updateVideo  -- start");
    let lang = checkLanguage(req);
    try {
        const result = await videoService.update(lang, req.body);
        logger.debug("videoController.updateVideo");
        res.status(200).send({message:result});
    } catch (error) {
        next(error);
    }
};

const deleteVideo = async (req, res, next) => {
    logger.debug("videoController.deleteVideo  -- start");
    const { id } = req.params
    let lang = checkLanguage(req);
    try {
        const result = await videoService.remove(lang, id);
        logger.debug("videoController.deleteVideo");
        res.status(200).send({message:result});
    } catch (error) {
        next(error);
    }
};

const getVideos = async (req, res, next) => {
    logger.debug("videoController.getVideos  -- start");
    let getLang = req.headers["accept-language"]
    let lang = checkLanguage(req);
    try {
        const result = await videoService.getAllVideos(lang, getLang);
        logger.debug("videoController.getVideos  -- success");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

const getVideo = async (req, res, next) => {
    logger.debug("videoController.getVideo  -- start");
    let getLang = req.headers["accept-language"]
    const { id } = req.params
    let lang = checkLanguage(req);
    try {
        const result = await videoService.getById(lang, id, getLang);
        logger.debug("videoController.getVideo  -- success");
        res.send({ result });
    } catch (error) {
        next(error);
    }
};

module.exports = { addVideo, updateVideo, deleteVideo, getVideos, getVideo }