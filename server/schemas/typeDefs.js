const { gql } = require("apollo-server-express");
const { DateTime } = require('graphql-scalars')


const typeDefs = gql`
scalar DateTime
  type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    chats: [Chat]
  }
  type Message {
    _id: ID
    message: String
    sentBy: User
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
    me(userId: ID!): User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addFriend(from: ID!, to: ID!): User
    createChat(users: [ID!]): Chat
    sendMessage(chatId: ID!, message: String!, sentBy: ID!): Chat
  }
`;
module.exports = typeDefs;
