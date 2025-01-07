const jwt = require("jsonwebtoken");
const tokenModel = require("../models/tokenSchema.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");

const generateTokens = async (payload) => {
    logger.debug("tokenService.generateTokens -- start");
    if (!payload) {
        logger.warn("tokenService.generateTokens -- null param");
        throw ApiError.BadRequest();
    }
    try {
        const accessToken = jwt.sign(payload, process.env.jwt_access_secret, {expiresIn: "1h"});
        const refreshToken = jwt.sign(payload, process.env.jwt_refresh_secret, {expiresIn: "30d"});
        logger.debug("tokenService.generateTokens -- successs");
        return {
            accessToken, refreshToken
        }
    } catch (error) {
        throw error;
    }
}

const validateAccessToken = async (token) => {
    logger.debug("tokenService.validateAccessToken -- start");
    try {
        if (!token) {
            logger.warn('tokenService.validateAccessToken -- null params');
            ApiError.UnauthorizedError();
        }
        const user = await jwt.verify(token, process.env.jwt_access_secret);
        logger.debug("tokenService.validateAccessToken -- success");
        return user;
    } catch (e) {
        return null;
    }
}


const validateRefreshToken = async (token) => {
    logger.debug("tokenService.validateRefreshToken -- start");
    if (!token) {
        logger.warn("tokenService.validateRefreshToken -- null param");
        throw ApiError.UnauthorizedError();
    }
    try {
        const userData = jwt.verify(token, process.env.jwt_refresh_secret);
        logger.debug("tokenService.validateRefreshToken -- success");
        return userData;
    } catch (e) {
        return null;
    }
}

const saveToken = async (userId, refreshToken) => {
    logger.debug("tokenService.saveToken -- start");
    if (!userId && !refreshToken) {
        logger.warn("tokenService.saveToken -- null param");
        throw ApiError.BadRequest();
    }
    try {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        logger.debug("tokenService.saveToken -- success");
        return token;
    } catch (error) {
        throw error;
    }
}

const removeToken = async (userId) => {
    try {
        logger.debug("tokenService.removeToken -- start");
        const tokenRemove = await tokenModel.deleteOne({user:userId});
        logger.debug("tokenService.removeToken -- success");
        return tokenRemove;
    } catch (error) {
        throw error;
    }
}

const findToken = async (refreshToken) => {
    logger.debug("tokenService.findToken -- start");
    if (!refreshToken) {
        logger.warn('tokenService.findToken -- null param');
        throw ApiError.BadRequest();
    }
    try {
        const tokenData = await tokenModel.findOne({refreshToken: refreshToken});
        logger.debug('tokenService.findToken -- success');
        return tokenData;
    }catch (error){
        throw error
    }
}

module.exports = {
    generateTokens,
    validateAccessToken,
    validateRefreshToken,
    saveToken,
    removeToken,
    findToken
}