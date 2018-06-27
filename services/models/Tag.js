var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var TagSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  color: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Tag = mongoose.model("Tag", TagSchema);

// Export the Article model
module.exports = Tag;
