const  cors = require('cors');


//initial security setup
module.exports = (app) => {
    app.use(cors(
         {
             origin: "*"
         }
    ))
}