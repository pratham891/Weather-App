// jshint esversion: 6

const express = require("express");
const app = express();


const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');



// DEFINE VARIABLES
let location = "";
let temp = "";
let des = "";
let icon = "";
let urlImg = "";






// GET
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// POST
app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "5ee92ee5f758250cf89bb644e3230613";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log("Status Code: " + response.statusCode);


        response.on("data", function (data) {

            const weatherData = JSON.parse(data);

            location = weatherData.name;
            temp = weatherData.main.temp;
            des = weatherData.weather[0].description;
            icon = weatherData.weather[0].icon;
            urlImg = "http://openweathermap.org/img/wn/" + icon + "@2x.png";




            
            res.render("index", {
                dataLocation: location,
                dataTemp:temp,
                dataDes: des,
                dataIcon: icon,
                dataUrlImg: urlImg
            });
        });
    });
});








// LISTEN
app.listen("3000", () => {
    console.log("Server is listening on port 3000.");
});


