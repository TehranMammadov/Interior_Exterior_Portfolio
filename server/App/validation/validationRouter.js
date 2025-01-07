const {formValidationOption} = require("./options/formValidation.js");
const {registrationOption} = require("./options/registrationValidation.js");
const {roleOption} = require("./options/roleValidation.js");
const {loginOption} = require("./options/loginValidation.js");
const {
    aboutPostOption,
    aboutPatchOption,
    aboutContentPatchOption,
    aboutModulePatchOption,
} = require("./options/aboutValidation.js");
const {languageOption} = require("./options/headerValidation.js");
const {categoryPatchOption, categoryRemoveOption, categoryPostOption} = require("./options/categoryValidation.js");
const {blogPostOption, blogPatchOption, blogRemoveOption} = require("./options/blogValidation.js");
const {portfolioPostOption, portfolioPatchOption, portfolioRemoveOption} = require("./options/portfolioValidation.js");
const {mainPostOption, mainPatchOption} = require("./options/mainValidation.js");
const { videoPostOption, videoPatchOption, videoDeleteAndGetOption }  = require("./options/videoValidation.js");

module.exports = {
    formValidationOption,
    registrationOption,
    roleOption,
    loginOption,
    aboutPostOption,
    aboutPatchOption,
    aboutContentPatchOption,
    aboutModulePatchOption,
    languageOption,
    categoryPatchOption,
    categoryRemoveOption,
    categoryPostOption,
    blogPostOption,
    blogPatchOption,
    blogRemoveOption,
    portfolioPostOption,
    portfolioPatchOption,
    portfolioRemoveOption,
    mainPostOption,
    mainPatchOption,
    videoPostOption,
    videoPatchOption,
    videoDeleteAndGetOption
};
