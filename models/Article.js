// Require mongoose node module
var mongoose = require("mongoose");

// Reference to MongoDB schema constructor
var Schema = mongoose.Schema;

// ArticleSchema will be used to create each new article record
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  datePublished: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Creates model with mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;