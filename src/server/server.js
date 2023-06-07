
const dotenv = require("dotenv");
dotenv.config();

// Geonames API
const geoNameBaseUrl = "http://api.geonames.org/searchJSON?q=";
const geonamesUser = `&username=${process.env.GEONAME_API_KEY}`;
const geonamesParams = "&maxRows=10";
//Weatherbit API
const weatherBitBaseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherBitKey = `&key=${process.env.WEATHER_API_KEY}`;
//Pixabay API
const pixabayBaseUrl = "https://pixabay.com/api/";
const pixabayKey = `?key=${process.env.PIXABAY_API_KEY}`;
const pixabayParams = "&category=buildings&image_type=photo&orientation=horizontal&safesearch=true&per_page=100";

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const fetch = require("node-fetch");

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = 8081;

function serverListening() {
    console.log("Server started");
    console.log("Listening http://localhost:" + port);

}

const server = app.listen(port, serverListening);

//GET route
app.get('/getData', getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}

//POST route
app.post('/addNewTrip', addNewTrip);

async function addNewTrip(req, res) {
  projectData = req.body;
  console.log("=== addNewTrip === : req projectData", projectData);

  let fetchUrl =`${geoNameBaseUrl}${projectData.city}${geonamesParams}${geonamesUser}`;

  console.log(fetchUrl);

  const response = await fetch(fetchUrl);

  try {
    const data = await response.json();
    console.log(data);

    if (data.totalResultsCount != 0) {
      projectData["long"] = data.geonames[0].lng;
      projectData["lat"] = data.geonames[0].lat;
      projectData["name"] = data.geonames[0].name;
      projectData["country"] = data.geonames[0].countryName;
      projectData["code"] = data.geonames[0].countryCode;
      console.log("=== addNewTrip === : added projectData ", projectData);
      res.send(projectData);
    } else {
      res.statusMessage = "City not found";
      res.status(400).end();
    }
  } catch (err) {
    console.log("addNewTrip error: ", err);
  }
}

app.get('/getData', getData);

function getData(req, res) {
    res.send(projectData);
    console.log("=== getProjectData === ::::::::: ");
    console.log(projectData);
    console.log("=== getProjectData === ^^^^^^^^^ ");
}

//GET route
app.get('/getWeatherData', getWeatherData);

async function getWeatherData(req, res) {

  const lat  = projectData.lat;
  const long = projectData.long;
  const city = projectData.city;

  console.log("=== getWeatherData === : city " + city + "[ " + lat + ", " + long + " ]");

  let fetchUrl =`${weatherBitBaseUrl}lat=${lat}&lon=${long}${weatherBitKey}`;

  console.log(fetchUrl);

  const response = await fetch(fetchUrl);

  try {
    const data = await response.json();

    projectData["icon"] = data.data[0].weather.icon;
    projectData["description"] = data.data[0].weather.description;
    projectData["temp"] = data.data[0].temp;
    projectData["high_temp"] = data.data[0].high_temp;
    projectData["low_temp"] = data.data[0].low_temp;
    console.log(projectData);
    res.send(projectData);
  } catch (err) {
    console.log("getWeatherData error: ", err);
  }
}

//GET route
app.get('/getCityPhoto', getCityPhoto);

async function getCityPhoto(req, res) {

  const city = projectData.city;

  console.log("=== getCityPhoto === : city " + city);

  let fetchUrl =`${pixabayBaseUrl}${pixabayKey}&q=${city}${pixabayParams}`;

  console.log(fetchUrl);

  const response = await fetch(fetchUrl);

  try {
    const data = await response.json();

    if (data.totalHits > 0) {
      projectData["image"] = data.hits[0].webformatURL;
    } else {
      projectData["image"] = "";
    }

    console.log(projectData);
    res.send(projectData);
  } catch (err) {
    console.log("getCityPhoto error: ", err);
  }
}

