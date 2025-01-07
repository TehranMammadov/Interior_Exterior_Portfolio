const logger = require('../logger/index.js');
const {sendEmail} = require('../service/formService.js');
const checkLanguage = require("../utill/accept_language");

const form = async (req,res,next) => {
  try {
    let lang = checkLanguage(req);
    logger.debug('FormController.form -- start')
    const {email,phone,message} = req.body
    const result = await sendEmail(email,phone,message,lang);
    logger.debug('FormController.form -- success')
    res.status(200).send({message:result})
  }catch (error){
     next(error)
  }
}

module.exports={
  form
}
