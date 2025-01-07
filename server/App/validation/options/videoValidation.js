const {id, url, azTitle, enTitle, azDescription, enDescription, ruTitle, ruDescription} = require("../validationObject.js");


const videoPostOption = [
    url,
    azTitle,
    enTitle,
    ruTitle,
    azDescription,
    enDescription,
    ruDescription
];

const videoPatchOption = [
    id,
    url,
    azTitle,
    enTitle,
    ruTitle,
    azDescription,
    enDescription,
    ruDescription
];

const videoDeleteAndGetOption = [
    id,
];

module.exports = {
    videoPostOption,
    videoPatchOption,
    videoDeleteAndGetOption
};
