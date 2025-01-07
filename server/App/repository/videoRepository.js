const videoSchema = require("../models/videoSchema.js");
const logger = require("../logger/index.js");
const categorySchema = require("../models/categorySchema");

const create = async (query) => {
    try {
        logger.debug("videoRepo.create  -- start");
        const video = await videoSchema.create(query);
        await video.save();
        logger.debug("videoRepo.create  -- success");
        return video;
    } catch (error) {
        throw error;
    }
};

const updateVideo = async (id, query) => {
    try {
        logger.debug("videoRepo.create  -- start");
        const video = await videoSchema.findByIdAndUpdate({_id: id}, query);
        await video.save();
        logger.debug("videoRepo.create  -- success");
        return video;
    } catch (error) {
        throw error;
    }
};

const deleteVideo = async (id) => {
    try {
        logger.debug("videoRepo.delete  -- start");
        const video = await videoSchema.deleteOne({ _id: id });
        logger.debug("videoRepo.delete  -- success");
        return video;
    } catch (e) {
        throw e;
    }
};

const getAll = async () => {
    try {
        logger.debug("videoRepo.getAll  -- start");
        const videos = await videoSchema.find().lean();
        logger.debug("videoRepo.getAll  -- success");
        return videos;
    } catch (error) {
        throw error;
    }
};

const get = async (id) => {
    try {
        logger.debug("videoRepo.get  -- start");
        const video = await videoSchema.findById({_id: id}).lean();
        logger.debug("videoRepo.get  -- success");
        return video;
    } catch (error) {
        throw error;
    }
};

module.exports = { create, updateVideo, deleteVideo, getAll, get }