const validationObject = require("../validationObject.js");

const loginOption=[
    validationObject.emailValidation,
    validationObject.passwordValidation,
]

module.exports ={
    loginOption
}