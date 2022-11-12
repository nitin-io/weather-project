const { response, json } = require("express");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    let city = req.body.city;
    let unit = req.body.unit;
    let apiKey = "695e9f329499dafde0380b3a83cd98f3";
    const weatherAPIEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",in&appid=" +apiKey+ "&units="+ unit;
    https.get(weatherAPIEndpoint, function(response){
        response.on("data", function(data){
            const receivedData = JSON.parse(data);
            let temprature = receivedData.main.temp;
            let city = receivedData.name;
            let weatherDescription = receivedData.weather[0].description;
            let image = receivedData.weather[0].icon;
            let imageURL = "https://openweathermap.org/img/wn/"+ image +"@2x.png";

            res.write(`<h1>City: ${city}, Temprature: ${temprature}, Weather Discription: ${weatherDescription}</h1>`);
            res.write(`<img src="${imageURL}">`);
            res.send();
        });
    });
})

// app.get("/", function(req, res){
//     let city = "Dehradun";
    
//     let unit = "metric"
    

//     https.get(weatherAPIEndpoint, function(response){
//         // console.log(response);

//         response.on("data", function(data){
//             const weatherData = JSON.parse(data);
// 		let temp = weatherData.main.temp;
// 		let discription = weatherData.weather[0].description;
// 		let city = weatherData.name; 
// 		let weatherImage = weatherData.weather[0].icon;
// 		let imageURL = 
//         })
//     });
// });


app.listen(3000, function(){
    console.log("Running on Port 3000..");
});
