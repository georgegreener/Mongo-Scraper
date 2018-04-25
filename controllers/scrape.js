// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var exphbs = require("express-handlebars");

var app = express();

// Models are imported here
var db = require("../models");

  // Route hit on page-load
  app.get("/", function(req, res) {

    // Search for all existing articles in database
    db.Article.find({})
      .then(function(savedArticles) {

        // Creates a reference to headlines existing in MongoDB for comparison
        let savedHeadlines = savedArticles.map(article => article.headline);

        // Make a request to "nature.com"
        request("https://www.nature.com/nature/", function(error, response, html) {

          // Load the HTML body into cheerio
          var $ = cheerio.load(html);
      
          // Use cheerio to target each div with the property-value of [itemtype='http://schema.org/ScholarlyArticle']
          $("div[itemtype='http://schema.org/ScholarlyArticle']").each(function(i, element) {

            // Create a newArticle object with extracted values
            var thisArticle = {
              headline: $(this).children("h3").children().text().trim(),
              photo: $(this).children("h3").children().children().attr("src"),
              datePublished: $(this).children().children("time").text(),
              author: $(this).children("ul").children().text().trim(),
              summary: $(this).children("div").children().text().trim(),
              url: "https://www.nature.com" + $(this).children("h3").children().attr("href")
            }

            if (savedHeadlines.includes(thisArticle.headline)) {
              console.log("This article already exists");
              console.log(thisArticle);
            }
            else {
              console.log("New article! Adding to database");
              console.log(thisArticle);
              db.Article.create(thisArticle)
                .then(function(data) {
                  console.log(data);
                })
                .catch(function(err) {
                  console.log(err);
                });
                
            }

          })

      })

    })
    .catch(function(err) {
      console.log(err);
    });

    db.Article.find({})
      .then(function(savedArticles) {
        res.render("index", { articles: savedArticles });
      })
      .catch(function(err) {
        console.log(err);
      })

  });

module.exports = app;