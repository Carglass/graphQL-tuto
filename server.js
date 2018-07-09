var express = require("express");
var graphqlHTTP = require("express-graphql");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

// Construct a schema, using GraphQL schema language

var PORT = process.env.PORT || 5000;

// URI for Mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/kettlecat";

// Initialize Express
var app = express();

// Configure middleware
app.use(cors());

// Use GraphQL to handle requests
app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./services/graphQL/schema"),
    rootValue: require("./services/graphQL/root"),
    graphiql: true
  })
);

// Use morgan logger for logging requests
app.use(logger("dev"));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
