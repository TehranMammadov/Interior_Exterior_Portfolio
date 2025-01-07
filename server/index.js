const express = require("express");
const env = require('dotenv');
const logger= require('./App/logger/index.js');
const security = require('./App/config/security.js');
const serverSetup = require('./App/config/serverSetup.js');
const processNode = require('./App/config/process.js');
const router = require('./App/router/index.js');
const dbConnection = require('./App/config/db.js');
const {apiErrorMiddleware} = require('./App/middleware/errorMiddleware.js');
const  cookieParser = require('cookie-parser');
const swaggerUI = require("swagger-ui-express");
const yamljs = require("yamljs");
const swaggerDocument = yamljs.load('./swagger.yaml');
// Express app
const app = express()
// Environment configuration that writes .env content to process.env
env.config()
security(app)
serverSetup(app)
processNode(logger)
router(app)
app.use(cookieParser());
app.use('/public',express.static('public'));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(apiErrorMiddleware)
// app.use(errmid)
const port = process.env.PORT || 3000
// lifting Server
app.listen(port, async()=>{
    logger.info(`App listening on port : ${port}`)
    dbConnection()
})