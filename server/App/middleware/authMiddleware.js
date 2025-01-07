const ApiError = require("../exceptions/apiError.js");
const logger = require("../logger/index.js");
const tokenService = require("../service/tokenService.js");


module.exports=async function (req, res, next) {
    try {
        logger.debug('authMiddleware - start');
        const authHeader = req.headers['x-leyla-authorization'];
        let user;
            const token = authHeader.split(' ')[1];
            user = await tokenService.validateAccessToken(token);
            if (user === null) {
                return next();
            }
        req.user = user;
        logger.debug('authMiddleware - success');
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}