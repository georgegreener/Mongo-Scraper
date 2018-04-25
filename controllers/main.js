// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var exphbs = require("express-handlebars");

var app = express();

var db = require("../models");

// app.get("/", function(req, res) {
//   db.Article.find({})
//   .then(function(savedArticles) {
//     res.render("index", { articles: savedArticles });
//   })
//   .catch(function(err) {
//     console.log(err);
//   })
// });

module.exports = app;