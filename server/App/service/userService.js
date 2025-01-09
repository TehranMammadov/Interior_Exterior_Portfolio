const bcrypt = require("bcrypt");
const {
    createUser,
    createRole,
    findUserByEmail,
    findRoleByValue,
    findUserById,
    findRoles
} = require("../repository/userRepository.js");
const logger = require("../logger/index.js");
const ApiError = require("../exceptions/apiError.js");
const {generateTokens, saveToken, validateAccessToken,removeToken,validateRefreshToken} = require("./tokenService.js");
const userRepositoryHelper = require("../helper/userRepositoryHelper.js");
const enums = require("../enums/enums.js");
const language = require("../language/language.js");

const registration = async (email,password,confirmPassword,lang)=>{
    logger.debug("userService.registration -- start");
    if (!email && password && confirmPassword){
        logger.warn("userService.registration -- null param");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    const candidate = await findUserByEmail(email);
    if (candidate) {
        logger.warn(`userService.registration -- Exist email -- ${JSON.stringify(candidate)}`);
        throw ApiError.ConflictException(language[lang].existEmails);
    }
    if (password !== confirmPassword){
        logger.warn(`userService.registration -- password mismatch`);
        throw ApiError.BadRequest(language[lang].passwordMismatch);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    // const role = await findRoleByValue(enums.USER);
    const role = await findRoles()
    if (!role){
        logger.warn("userService.registration -- success");
        throw ApiError.NotFoundException(language[lang].notExistRole);
    }
    const user = await createUser(email,hashPassword,role[1]._id);
    if (!user){
        logger.warn("userService.registration -- success");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug("userService.registration -- success");
     return {message:language[lang].successfullyRegistrationMessage};
}
const role = async (roleName,lang)=>{
    logger.debug("userService.createRole -- start");
    if (!roleName){
        logger.warn("userService.registration -- null param roleName");
        throw ApiError.BadRequest(language[lang].nullParam);
    }
    const existRole = await findRoleByValue(roleName);
    if (existRole){
        logger.warn("userService.registration -- exist role name");
        throw ApiError.BadRequest(language[lang].existRole);
    }
    const role = await createRole(roleName)
    if (!role){
        logger.warn("userService.registration -- role error");
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug("userService.createRole -- success");
    return language[lang].roleCreatedSuccessfully
}

const getRoles = async (lang)=>{
    logger.debug("userService.createRole -- start");
    const roles = await findRoles();
    if (roles.length === 0){
        logger.warn("userService.registration -- exist role name");
        throw ApiError.NotFoundException(language[lang].notExistRole);
    }
    logger.debug("userService.createRole -- success");
    return roles
}

const loginSystem = async (email,password,lang)=>{
    logger.debug("userService.loginSystem -- start");
    const user = await findUserByEmail(email);
    if (!user) {
        logger.warn("userService.loginSystem - user not founded ");
        throw ApiError.NotFoundException(language[lang].userNotExist);
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
        logger.warn("userService.loginSystem - mismatch password");
        throw ApiError.BadRequest(language[lang].wrongPassword);
    }
    const userRepoHelper = new userRepositoryHelper(user)
    const tokens = await generateTokens({...userRepoHelper});
    await saveToken(userRepoHelper.id, tokens.refreshToken);
    logger.debug("userService.loginSystem -- success");
    return {
        ...tokens,
        user: userRepoHelper
    };
}

const logoutSystem = async (refreshToken,lang)=>{
    logger.debug("userService.logoutSystem -- start");
    const user = await validateRefreshToken(refreshToken);
    if (!user) {
        logger.warn("userService.logoutSystem - user not founded ");
        throw ApiError.NotFoundException(language[lang].userNotExist);
    }
    const token = await removeToken(user.id);
    if (token.deletedCount === 0) {
        logger.warn("userService.logoutSystem - logout error")
        throw ApiError.GeneralException(language[lang].serverError);
    }
    logger.debug("userService.logoutSystem -- success");
    return language[lang].logout;
}



const refresh = async (refreshToken)=>{
    logger.debug('userService.refresh - start');
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) {
        logger.warn('userService.refresh - not founded !');
        throw ApiError.UnauthorizedError();
    }
    const user = await findUserById(userData.id);
    if (!user) {
        logger.warn('userService.refresh - user not founded !');
        throw ApiError.UnauthorizedError();
    }
    const userRepoHelper = new userRepositoryHelper(user);
    const tokens = await generateTokens({...userRepoHelper});
    if (!tokens) {
        logger.warn('userService.refresh - tokens not founded !');
        throw ApiError.UnauthorizedError();
    }
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    logger.debug('userService.refresh - success');;
    return {...tokens, user: userRepoHelper};

}

module.exports = {
    registration,
    role,
    getRoles,
    loginSystem,
    logoutSystem,
    refresh
}