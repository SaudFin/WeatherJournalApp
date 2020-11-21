// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Routes

// GET Route
app.get("/recent", function(req, res) {
  res.send(projectData);
});

// POST Route
app.post("/add", function(req, res) {
  let data = req.body;
  console.log("here");
  //   to specify the data that we wanted to add to our endpoint
  // let entry = {
  // temperature: data.temperature,
  // date: data.date,
  // userResponse: data.userResponse
  // };
  projectData.temp = data.temperature;
  projectData.date = data.date;
  projectData.userResponse = data.userResponse;
  console.log(projectData);
});
// Setup Server
const port = 8000;
const server = app.listen(port, () => console.log(`it is running on ${port}`));
