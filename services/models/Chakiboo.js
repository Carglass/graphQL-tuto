var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ChakibooSchema object
var ChakibooSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  code: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  language: {
    type: String,
    required: true
  },
  howToUse: {
    type: String
  },
  isPrivate: {
    type: Boolean
  },
  author: { type: Schema.Types.ObjectId, ref: "User" }
});

// This creates our model from the above schema, using mongoose's model method
var Chakiboo = mongoose.model("Chakiboo", ChakibooSchema);

// Export the Chakiboo model
module.exports = Chakiboo;
