const logger =require("../logger/index.js");
const apiError = require('../exceptions/apiError.js');

const apiErrorMiddleware = (err,req,res,next)=> {
        if (err instanceof apiError){
            logger.error(err)
            return res.status(err.status).send({message: err.message, errors: err.errors});
        }
        logger.error(err)
        return res.status(500).json({message: 'Gözlənilməz xəta !'});
    }

module.exports = {
    apiErrorMiddleware
}