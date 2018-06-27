var { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Tag {
    id: ID!
    name: String
    color: String
  }

  type Query {
    tag(id: ID!): Tag
  }
`);
