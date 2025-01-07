const logger = require('../logger/index.js');
const transporter = require('../config/email.js');
const messageSchema = require("../models/messageSchema.js");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");


const sendEmail = async (email,phone, message,lang) => {
    logger.debug('FormController.form -- start');
    try {
    const mess = (await messageSchema.create({
        email: email,
        message: message,
        phone:phone
    })).save();
    if (!mess){
        logger.debug('FormController.form -- start');
        return  ApiError.GeneralException('Server xətası')
    }
    }catch (error){
        throw error
    }
    const mail = {
        from: '"Leyla Naib" <freshmarket.message@gmail.com>',
        to: 'info@leenhair.az',
        subject: `Client has sent a message from ${email}`,
        html: `<b>Phone : ${phone}</b><br><b>${message}</b>`,
    }
    await transporter.sendMail(mail, (err, info) => {
        if (err){
            console.log(err)
            throw ApiError.GeneralException('Xəta baş verdi')
            logger.error(`email error ${JSON.stringify(err)}`)
        } else logger.info(`message has sent successfuly ${JSON.stringify(info)}`);
    });
    logger.debug('FormController.form -- success');
    return  language[lang].emailMessage
}

module.exports = {
    sendEmail
}