const express = require("express");
const path = require("node:path")
const app = express();
const fs = require('node:fs')
const PORT = process.env.PORT || 3000; // 3000 is for development purpose and process.env.PORT is for deployment purpose.
const mongodbConnection = require("./config/mongodbConnection.js")
const cors = require("cors")
const corsOption = require("./config/corsConfig.js")
const User = require('./model/user.js');
const apiController = require("./controllers/apiRouteControllers.js");

//! hanlde cross origin resource sharing.
app.use(cors(corsOption))

//! connecting to the databases
const dbUrl = 'mongodb://127.0.0.1:27017/youtube-app-1';
mongodbConnection(dbUrl).then(() => {
    console.log('connected to the database')
})

//!************************************* setting up the middlewares *******************************************************************
app.use(express.urlencoded({ extended: true }));     //? for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')))  //? for serving static files
app.use('/api', require('./routes/apiRouter.js'))     //? for route handling using express.Router()
app.use('/', require("./routes/rootRouter.js"))        //? for route handling using express.Router()


//! connecting to the port , listening to the port , and console log the port.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
