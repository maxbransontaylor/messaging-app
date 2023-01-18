const { gql } = require("apollo-server-express");
const { DateTime } = require("graphql-scalars");

const typeDefs = gql`
  scalar DateTime
  type User {
    _id: ID
    username: String
    email: String
    friends: [Friend]
    chats: [Chat]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Friend {
    userId: ID
    username: String
    status: String
  }
  type Message {
    _id: ID
    message: String
    sentBy: User
    sentByUsername: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type Chat {
    _id: ID
    users: [User]
    messages: [Message]
    updatedAt: DateTime
  }
  type Query {
    users: [User]
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFriend(to: String!): User
    confirmFriend(to: ID): User
    createChat(users: [ID!]): Chat
    sendMessage(chatId: ID!, message: String!): Chat
  }
`;
module.exports = typeDefs;
