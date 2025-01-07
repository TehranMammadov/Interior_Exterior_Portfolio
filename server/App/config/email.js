const  nodemailer= require('nodemailer');
require("dotenv").config();

module.exports = nodemailer.createTransport({
    service: 'yandex',
    port:"465",
    host: 'smtp.yandex.ru',
    secure: false,
    authentication:'plain',
    enable_starttls_auto: true,
    auth: {
        user: process.env.gmail_user, // generated ethereal user
        pass: process.env.gmail_password, // generated ethereal password
    },
})
