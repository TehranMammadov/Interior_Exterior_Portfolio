const validationObject = require("../validationObject.js");


const blogPostOption = [
    validationObject.title,
    validationObject.description,
    validationObject.category,
];

const blogPatchOption = [
    validationObject.id,
    validationObject.title,
    validationObject.description,
    validationObject.category,
];

const blogRemoveOption = [
    validationObject.id
];




module.exports= {
    blogPostOption,
    blogPatchOption,
    blogRemoveOption
}