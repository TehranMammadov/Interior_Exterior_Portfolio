const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError.js");
const language = require("../language/language.js");
const checkLanguage= require("../utill/accept_language");

const checkErrors = (req, res, next) => {
  const lang = checkLanguage(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.errors.forEach((doc) => {
      doc.msg = language[lang].nullParam;
      delete doc.value;
      delete doc.location;
    });
    return next(ApiError.ValidationError("Validation error", errors.mapped()));
  }
  next();
};

module.exports = { checkErrors };
