const  express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


module.exports =  (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cookieParser());
//   app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
