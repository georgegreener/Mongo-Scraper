// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var exphbs = require("express-handlebars");
var path = require("path");

var PORT = process.env.PORT || 8080;

// If deployed, use the deployed database. Otherwise use the local natureReader database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/natureReader";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {});

// Models are imported here
var db = require("./models");

// Store access to Express in variable
var app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

// Setting up public folder, and how Express will parse information
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Our server routes will be imported here
var scrape = require("./controllers/scrape");
var main = require("./controllers/main");
app.use(scrape);
app.use(main);

// Starts server
app.listen(PORT, function() {
  console.log("This is Dr. Frasier Crane... I'm listening...\nPort: " + PORT);
});