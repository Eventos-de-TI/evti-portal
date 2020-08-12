const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  input SigninInput {
    name: String
    email: String!
    username: String!
    password: String!
  }

  input SignupInput {
    name: String
    email: String!
    username: String!
    password: String!
  }

  type AuthResponse {
    access_token: String
  }

  type Mutation {
    signin(input: SigninInput): AuthResponse
    signup(input: SignupInput): AuthResponse
  }
`;

module.exports = typeDefs;
