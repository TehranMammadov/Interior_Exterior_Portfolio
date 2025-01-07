const userService = require("../service/userService.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");

module.exports = async function (req, res, next) {
    try {
        logger.debug('refreshMiddleware -- start');
        if (req.user) return next();
        const refreshToken = req.headers["x-leyla-refreshtoken"];
        if (!refreshToken){
            logger.warn('refreshMiddleware -- user not founded');
            next(ApiError.UnauthorizedError());
        }
        const token = refreshToken.split(' ')[1];
        const newUserData = await userService.refresh(token);
        if (!newUserData) {
            logger.warn('refreshMiddleware -- user not founded');
            next(ApiError.UnauthorizedError());
        }

        res.setHeader('x-leyla-authorization', newUserData.accessToken);
        res.setHeader('x-leyla-refreshToken', newUserData.refreshToken);
        req.user = newUserData.user;
        logger.debug('refreshMiddleware -- success');
        next()
    } catch (e) {
        next(e);
    }
}