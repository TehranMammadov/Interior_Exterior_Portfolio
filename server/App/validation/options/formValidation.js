const validationObject = require("../validationObject.js");

const formValidationOption = [
  validationObject.emailValidation,
  validationObject.messageValidation,
  validationObject.phone,
];

module.exports = { formValidationOption };
