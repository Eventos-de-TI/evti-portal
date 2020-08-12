"use strict";

const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./gql/resolvers");
const typeDefs = require("./gql/typeDefs");
const getAuthScope = require("./auth/getAuthScope");
const app = require("./app");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (integrationContext) => ({
    auth: getAuthScope(integrationContext),
  }),
});

apolloServer.applyMiddleware({ app });

module.exports = app;
