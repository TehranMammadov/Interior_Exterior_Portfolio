const userSchema = require("../models/userSchema.js");
const roleSchema = require("../models/roleSchema.js");
const logger= require("../logger/index.js");

 const createUser = async (email,password,roleId)=>{
    try {
        logger.debug("userRepository.createUser -- start");
        const user = (await userSchema.create({
            email: email,
            role:roleId ,
            password: password
        })).save();
        logger.debug("userRepository.createUser -- success");
        return user;
    }catch (error){
        throw error
    }
}

 const createRole = async (roleName)=>{
    logger.debug("userRepository.createRole -- start");
    const role = (await roleSchema.create({
        role:roleName
    })).save()
    logger.debug("userRepository.createRole -- success");
    return role
}


 const findUserByEmail = async (email)=>{
    try {
        logger.debug("userRepository.findUserByEmail -- start");
        const user = userSchema.findOne({email:email}).lean();
        logger.debug("userRepository.findUserByEmail -- success");
        return user;
    }catch (error){
        throw error
    }
}

 const findUserById = async (id)=>{
    try {
        logger.debug("userRepository.findUserById -- start");
        const user = userSchema.findOne({_id:id}).lean();
        logger.debug("userRepository.findUserById -- success");
        return user;
    }catch (error){
        throw error
    }
}


 const findRoleByValue = async (val)=>{
    try {
        logger.debug("userRepository.findRoleByValue  -- start");
        const role =  roleSchema.findOne({roleName:val}).lean();
        logger.debug("userRepository.findRoleByValue  -- success");
        return role;
    }catch (error){
        throw error;
    }
}


 const findRoles = async ()=>{
    try {
        logger.debug("userRepository.findRoles  -- start");
        const role =  roleSchema.find({}).lean();
        logger.debug("userRepository.findRoles  -- success");
        return role;
    }catch (error){
        throw error;
    }
}

module.exports={
     createRole,createUser,findRoles,findUserByEmail,findRoleByValue,findUserById
}