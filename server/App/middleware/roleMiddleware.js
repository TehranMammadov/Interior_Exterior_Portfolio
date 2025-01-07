const ApiError = require("../exceptions/apiError.js");
const {findUserById,findRoleByValue} = require("../repository/userRepository.js");
const logger = require("../logger/index.js");
const enums = require("../enums/enums.js");

 const isAdmin = async(req, res, next)=> {
    try {
        logger.debug('roleMiddleware.IsAdmin -- start');
        const user = await findUserById(req.user.id);
        const useRole = await findRoleByValue(user.role);
        if (!(useRole.role === enums.role.ADMIN)) {
            logger.warn('roleMiddleware.IsAdmin -- user role is not ADMIN');
            return next(ApiError.UnauthorizedError());
        }
        logger.debug('roleMiddleware.IsAdmin -- start');
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}


 const  isUser = async (req, res, next) => {
    try {
        logger.debug('roleMiddleware.IsUser -- start');
        const user = await findUserById(req.user.id);
        const userRole = await findRoleByValue(user.role);
        if (!(userRole.role === enums.role.USER)) {
            logger.warn('roleMiddleware.IsUser -- user role is not USER');
            return next(ApiError.UnauthorizedError());
        }
        logger.debug('roleMiddleware.IsUser -- success');
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}


 const isModerator = async (req, res, next)=> {
    try {
        winston.debug('roleMiddleware.IsModerator -- start');
        const user = await findUserById(req.user.id);
        const userRole = await findRoleByValue(user.role);
        if (!(userRole.role === enums.role.MODERATOR)) {
            logger.warn('roleMiddleware.IsModerator -- user role is not MODERATOR');
            return next(ApiError.UnauthorizedError());
        }
        logger.debug('roleMiddleware.IsModerator -- success');
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}



module.exports={
     isModerator,isUser,isAdmin
}