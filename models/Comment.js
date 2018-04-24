// Require mongoose node module
var mongoose = require("mongoose");

// Reference to MongoDB schema constructor
var Schema = mongoose.Schema;

// CommentSchema will be used to create each new comment record
var CommentSchema = new Schema({
  body: String
});

// Creates model with mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment article
module.exports = Comment;