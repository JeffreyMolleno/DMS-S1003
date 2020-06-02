const express = require("express");
const cors = require("cors");
const massive = require("massive");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolver");
const BaseAPI = require("./datasource/BaseAPI");

const { ApolloServer } = require("apollo-server-express");

const app = express();

const connect = massive({
  host: "localhost",
  port: 5433,
  database: "dms",
  user: "postgres",
  password: "admin",
});

const db = async () => await connect;

const dataSources = () => ({
  Base: new BaseAPI({
    store: async () => await db(),
  }),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: async () => ({
    db: await connect,
  }),
});

app.use(cors());

server.applyMiddleware({ app, path: "/graphql" });

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Listening for request on port ", PORT);
});
