const validationObject = require("../validationObject.js");

const interiorPostOption = [
    validationObject.portfolio_title,
    validationObject.portfolio_description,
    validationObject.category,
    validationObject.spiker,
    validationObject.place,
    validationObject.startDate,
    validationObject.endDate
];

const interiorPatchOption = [
    validationObject.id,
    validationObject.portfolio_title,
    validationObject.portfolio_description,
    validationObject.category,
    validationObject.spiker,
    validationObject.place,
    validationObject.startDate,
    validationObject.endDate
];

const interiorRemoveOption = [
    validationObject.id
];




module.exports ={
    interiorPostOption,
    interiorPatchOption,
    interiorRemoveOption
}