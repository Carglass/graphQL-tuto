var mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  chakiboos: [{ type: Schema.Types.ObjectId, ref: "Chakiboo" }],
  secretChakiboos: [{ type: Schema.Types.ObjectId, ref: "Chakiboo" }],
  likedChakiboos: [{ type: Schema.Types.ObjectId, ref: "Chakiboo" }]
});

UserSchema.plugin(passportLocalMongoose);

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
