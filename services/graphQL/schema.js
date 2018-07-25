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
    author: ID
  }

  type Author {
    id: ID!
    username: String
    chakiboos: [ID]
    secretChakiboos: [ID]
    likedChakiboos: [ID]
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
    chakiboos(fromUser: Boolean, author: ID): [Chakiboo]
    chakiboo(id: ID): Chakiboo
    author(id: ID!): Author
    me: Author
  }

  type Mutation {
    createTag(input: TagCreationInput): Tag
    createChakiboo(input: ChakibooCreationInput): Chakiboo
    updateChakiboo(input: ChakibooUpdateInput): Chakiboo
    deleteChakiboo(id: ID!): ChakibooDeletePayload
    forkChakiboo(id: ID!): Chakiboo
  }
`);
