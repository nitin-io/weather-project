const { response, json } = require("express");
const express = require("express");
const https = require("https");
const ejs = require("ejs");
require('dotenv').config();
const capitalize = require("lodash.capitalize");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req, res){
    const weatherAPIEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=saharanpur,in&appid=" + process.env.WEATHER_API_KEY + "&units=metric";
    https.get(weatherAPIEndpoint, function(response){
        response.on("data", function(data){
            const receivedData = JSON.parse(data);
            let tempareture = receivedData.main.temp;
            // let city = receivedData.name;
            let weatherDescription = capitalize(receivedData.weather[0].description);
            let image = receivedData.weather[0].icon;
            let imageURL = "https://openweathermap.org/img/wn/"+ image +"@2x.png";

            res.render('index',({tempareture: tempareture, weatherDescription: weatherDescription, imageURL: imageURL}));
        });
    });
});

port = process.env.port || 8080;

app.listen(port, function(){
    console.log("Running on Port " + port);
});
