const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const api_key = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api_key + "&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp  = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write("<h1>Temperature in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<h3>The weather is currently is " + description + "</h3>")
      res.write("<img src=" + imageUrl + ">")
      res.send();
    })
  })
});



app.listen("3000", function(){
  console.log("Server is running at 3000");
})
