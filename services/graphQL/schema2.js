const db = require("./../models/index");

let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
  GraphQLInputObjectType
} = require("graphql");

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "A Chakiboo Author",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: { type: new GraphQLNonNull(GraphQLString) },
    chakiboos: {
      type: new GraphQLList(ChakibooType),
      resolve: function(author) {
        return db.Chakiboo.find({ author: author.id });
      }
    }
  })
});

const ChakibooType = new GraphQLObjectType({
  name: "Chakiboo",
  description: "This is a boilerplate Meow",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    code: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString },
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
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      description: "An author",
      resolve: function(obj, { id }, context, info) {
        return db.User.findById(id);
      }
    }
  })
});

const CreateChakibooInput = new GraphQLInputObjectType({
  name: "CreateChakibooInput",
  description: "The parameters available at chakiboo creation",
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    code: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString }
  })
});

const KettlecatMutationRootType = new GraphQLObjectType({
  name: "KettleCatRootMutation",
  description: "the RootMutation for Kettlecat app",
  fields: () => ({
    createChakiboo: {
      type: ChakibooType,
      args: { input: CreateChakibooInput },
      resolve: function(obj, { input }, context, info) {
        if(context.user) {
          const newChakiboo = Object.assign(input, context.user.id);
          return db.Chakiboo.create(newChakiboo)
        }
        return db.Chakiboo.create(input)
      }
    }
  })
});

const KettleCatAppSchema = new GraphQLSchema({
  query: KettlecatQueryRootType
});

module.exports = KettleCatAppSchema;
