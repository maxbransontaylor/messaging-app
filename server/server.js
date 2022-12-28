
const { ApolloServer } = require('apollo-server-express')
const express = require("express");
const db = require("./config/connection");
const app = express();
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth')
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware })
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });


  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
};

startApolloServer(typeDefs, resolvers);