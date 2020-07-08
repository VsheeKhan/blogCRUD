const express = require('express')
const appConfig = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const app = express();

//middelwares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//Bootstrap route

let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function(file) {
    if (~file.indexOf('.js')) {
        console.log("Including the following file");
        console.log(routesPath + '/' + file);
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
})

// Bootstrap models
let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function(file) {
    if (~file.indexOf('.js')) {
        console.log(file);
        require(modelsPath + '/' + file)
    }
})


app.listen(appConfig.port, () => {
    console.log(`Example app listening at http://localhost:${appConfig.port}`);
    // let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true });

    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

    mongoose.connection.on('error', function(err) {
        console.log('database connection error');
        console.log(err);
    });

    mongoose.connection.on('open', function(err) {
        if (err) {
            console.log("Database error");
            console.log(err);
        } else {
            console.log("Database connection open success");
        }
    });

})