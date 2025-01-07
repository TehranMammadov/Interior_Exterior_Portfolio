const validationObject = require("../validationObject.js");

const aboutPostOption = [
  validationObject.title,
  validationObject.quote,
  validationObject.description,
];

const aboutPatchOption = [validationObject.title, validationObject.quote];

const aboutContentPatchOption = [
  validationObject.row,
  validationObject.description,
  validationObject.id,
];

const aboutModulePatchOption = [
  validationObject.title,
  validationObject.description,
  validationObject.id,
];

module.exports= {
  aboutPostOption,
  aboutPatchOption,
  aboutContentPatchOption,
  aboutModulePatchOption,
};
