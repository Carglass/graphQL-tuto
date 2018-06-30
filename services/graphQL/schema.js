var { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Tag {
    id: ID!
    name: String!
    color: String
  }

  type Chakiboo {
    id: ID!
    title: String
    code: String
    description: String
    tags: [String]
    language: String
    howToUse: String
    isPrivate: Boolean
  }

  input TagCreationInput {
    name: String!
    color: String
  }

  input ChakibooCreationInput {
    title: String
    code: String
    description: String
    tags: [String]
    language: String
    howToUse: String
    isPrivate: Boolean
  }

  input ChakibooUpdateInput {
    id: ID!
    title: String
    code: String
    description: String
    tags: [String]
    language: String
    howToUse: String
    isPrivate: Boolean
  }

  type ChakibooDeletePayload {
    id: ID!
    status: String
  }

  type Query {
    tag(id: ID!): Tag
    chakiboos: [Chakiboo]
    chakiboo(id: ID): Chakiboo
  }

  type Mutation {
    createTag(input: TagCreationInput): Tag
    createChakiboo(input: ChakibooCreationInput): Chakiboo
    updateChakiboo(input: ChakibooUpdateInput): Chakiboo
    deleteChakiboo(id: ID!): ChakibooDeletePayload
  }
`);
