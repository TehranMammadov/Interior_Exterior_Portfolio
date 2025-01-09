const logger = require("../logger/index.js");
const {loginSystem, logoutSystem, registration, role,getRoles} = require("../service/userService.js");
const checkLanguage = require("../utill/accept_language");

 const register = async (req,res,next)=>{
    try {
    logger.debug("UserController.register -- start");
    let lang = checkLanguage(req);
    const {email,password,confirmPassword} = req.body;
    const result = await registration(email,password,confirmPassword,lang);
    res.status(201).send(result);
    logger.debug("UserController.register -- success");
    }catch (error){
        next(error)
    }
}
  const login = async (req,res,next)=>{
    try {
        logger.debug("UserController.login -- start");
        let lang = checkLanguage(req);
        const {email,password} = req.body
        const result = await loginSystem(email,password,lang);
        res.setHeader('x-leyla-authorization', `Bearer ${result.accessToken}`);
        res.setHeader('x-leyla-refreshToken', `Bearer ${result.refreshToken}`);
        // delete result.refreshToken;
        // delete result.accessToken;
        logger.debug("UserController.login -- success");
        res.status(200).send(result);
    }catch (error){
        next(error)
    }
}


  const logout = async (req,res,next)=>{
    try {
        logger.debug("UserController.logout -- start");
        let lang = checkLanguage(req);
        const refreshToken = req.headers['x-leyla-refreshtoken'];
        const token = refreshToken.split(" ")[1]
        const result = await logoutSystem(token,lang);
        res.status(200).send(result);
        logger.debug("UserController.logout -- success");
    }catch (error){
        next(error)
    }
}

  const createRole = async (req,res,next)=>{
    try {
        logger.debug('UserController.role -- start');
        let lang = checkLanguage(req);
        const {roleName} = req.body
        const result = await role(roleName,lang);
        res.status(201).send(result)
        logger.debug('UserController.role -- success')
    }catch (error){
        next(error)
    }
}



const auth = async (req,res,next)=>{
    try {
        logger.debug('UserController.auth -- start');
        res.status(200).send()
        logger.debug('UserController.auth -- success')
    }catch (error){
        next(error)
    }
}



  const getRoleList = async (req,res,next)=>{
    try {
        logger.debug('UserController.getRoles -- start');
        let lang = checkLanguage(req);
        const result = await getRoles(lang);
        res.status(202).send(result)
        logger.debug('UserController.getRoles -- success')
    }catch (error){
        next(error)
    }
}


module.exports={
     login,logoutSystem,role,getRoles,getRoleList,createRole,logout,register,auth
}