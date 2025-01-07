const validationObject= require("../validationObject.js");


const portfolioPostOption = [
    validationObject.portfolio_title,
    validationObject.portfolio_description,
    validationObject.category,
];

const portfolioPatchOption = [
    validationObject.id,
    validationObject.portfolio_title,
    validationObject.portfolio_description,
    validationObject.category,
];

const portfolioRemoveOption = [
    validationObject.id
];




module.exports ={
    portfolioPostOption,
    portfolioPatchOption,
    portfolioRemoveOption
}