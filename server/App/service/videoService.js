const { get, getAll, create, deleteVideo ,updateVideo } = require("../repository/videoRepository.js");
const  language  = require("../language/language.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const enVideoDTO = require("../helper/enVideoDTO");
const azVideoDTO = require("../helper/azVideoDTO");
const ruVideoDTO = require("../helper/ruVideoDTO");

const post = async (lang, body) => {
    logger.debug("videoService.post  -- start");
    const { url, azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription } = body;
    const video = await create({url, azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription});
    if (!video) {
        logger.warn("videoService.post  -- error");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    await video.save();
    return language[lang].videoSuccessfullyCreated; //
};

const update = async (lang, body) => {
    logger.debug("videoService.update  -- start");
    const { id, url, azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription } = body;
    const query = {url, azTitle, enTitle, ruTitle, azDescription, enDescription, ruDescription}
    const updatedVideo = await updateVideo(id, query);
    if (!updatedVideo) {
        logger.warn("videoService.update  -- error");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug("videoService.update  -- success");
    return language[lang].videoSuccessfullyUpdated;
};

const remove = async (lang, id) => {
    logger.debug("videoService.delete  -- start");
    console.log(id)
    const videos = await deleteVideo({_id:id});
    if (videos.length === 0) {
        logger.warn("videoService.delete  -- not found");
        throw ApiError.NotFoundException(language[lang].videoNotExists);
    }
    logger.debug("videoService.delete  -- success");
    return language[lang].videoSuccessfullyDeleted;
};

const getAllVideos = async (lang, getLang) => {
    logger.debug("videoService.getAll  -- start");
    const videos = await getAll();
    if (videos.length === 0) {
        logger.warn("videoService.getAll  -- not found");
        throw ApiError.NotFoundException(language[lang].videoNotExists);
    }
    let dto;
    if (getLang === 'en') {
        dto = videos.map((docs) => new enVideoDTO(docs))
    } else if (getLang === 'az') {
        dto = videos.map((docs) => new azVideoDTO(docs))
    } else if (getLang === 'ru') {
        dto = videos.map((docs) => new ruVideoDTO(docs))
    } else {
        dto = videos
    }
    logger.debug("categoryController.getAll  -- success");
    return dto;
};

const getById = async (lang, id, getLang) => {
    logger.debug("videoService.get  -- start");
    const video = await get(id);
    if (video.length === 0) {
        logger.warn("videoService.get  -- not found");
        throw ApiError.NotFoundException(language[lang].videoNotExists);
    }
    let dto;
    if (getLang === 'en') {
        dto = new enVideoDTO(video)
    } else if (getLang === 'az') {
        dto = new azVideoDTO(video)
    } else if (getLang === 'ru') {
        dto = new ruVideoDTO(video)
    } else {
        dto = video
    }
    logger.debug("categoryController.get  -- success");
    return dto;
};
module.exports = { post, update, remove, getAllVideos, getById }