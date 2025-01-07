const validationObject = require("../validationObject.js");


const categoryPostOption = [
    validationObject.categoryName,
];

const categoryPatchOption = [
    validationObject.categoryName,
];

const categoryRemoveOption = [
    validationObject.id
];




module.exports = {
    categoryPostOption,
    categoryPatchOption,
    categoryRemoveOption
}