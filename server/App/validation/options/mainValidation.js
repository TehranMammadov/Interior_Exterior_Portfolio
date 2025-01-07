const validationObject = require("../validationObject.js");


const mainPostOption = [
    validationObject.main_title,
    validationObject.main_title_extension,
    validationObject.quote,
    validationObject.author
];

const mainPatchOption = [
    validationObject.id,
    validationObject.main_title,
    validationObject.main_title_extension,
    validationObject.quote,
    validationObject.author
];

module.exports ={
 mainPatchOption,mainPostOption
}