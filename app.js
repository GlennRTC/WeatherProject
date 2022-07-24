const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res){
    
    console.log("Post request received!");
    const location = req.body.location;
    const apiKey = "7cad9165118998c5428209954bec5b02";
    const units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=" + units + "&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const description = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<p>The weather is " + description + " in " + req.body.location + "</p>");
          res.write("<h1>The temperature in " + req.body.location + " is " + temp + " degrees celsius</h1>");
          res.write("<img src=" + imageURL + ">");
          res.send();
        })
    });
});

    


app.listen(3000, function(){
    console.log("Server is running on port 3000...");
})