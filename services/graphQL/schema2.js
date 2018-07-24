const db = require("./../models/index");

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "A Chakiboo Author",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: { type: new GraphQLNonNull(GraphQLString) }
  })
});

const ChakibooType = new GraphQLObjectType({
  name: "Chakiboo",
  description: "This is a boilerplate Meow",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: function(chakiboo) {
        return db.User.findById(chakiboo.author);
      }
    }
  })
});

const KettlecatQueryRootType = new GraphQLObjectType({
  name: "KettleCatRootQuery",
  description: "The RootQuery for Kettlecat app",
  fields: () => ({
    chakiboos: {
      type: new GraphQLList(ChakibooType),
      description: "List of all chakiboos",
      resolve: function() {
        return db.Chakiboo.find({});
      }
    }
  })
});

const KettleCatAppSchema = new GraphQLSchema({
  query: KettlecatQueryRootType
});

module.exports = KettleCatAppSchema;
