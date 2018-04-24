// Import express
var express = require("express");

var app = express();

// Import cheerio module for scraping
var cheerio = require("cheerio");

// Import request module for a specific webpage
var request = require("request");

module.exports = function(app) {

  app.get("/scrape", function(req, res) {

    // Make a request to "nature.com"
    request("https://www.kotaku.com/", function(error, response, html) {

      if (error) console.log(error);

      // Load the HTML body into cheerio
      var $ = cheerio.load(html);
    
      // Empty array to store scraped data
      var results = [];
    
      $("h3.itemprop").each(function(i, element) {

        var headline = $(element).text();

        console.log(headline);



      });

    });

    res.send("ok");

  });


}