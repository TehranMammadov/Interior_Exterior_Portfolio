const validationObject= require("../validationObject.js");

const registrationOption=[
    validationObject.emailValidation,
    validationObject.passwordValidation
]

module.exports ={
    registrationOption
}