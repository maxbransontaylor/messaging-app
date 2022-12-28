const { User, Chat } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
    me: async (parent, { userId }) => {
      User.findById(userId).populate({
        path: "chats",
        populate: { path: "messages" },
        populate: { path: "users" },
      });
    },
  },
  Mutation: {
    addUser: async (parent, data) => {
      const user = await User.create(data);
      return user;
    },
    addFriend: async (parent, { from, to }) => {
      const friendA = await User.update(
        { _id: from },
        { $push: { friends: to } }
      );
      const friendB = await User.update(
        { _id: to },
        { $push: { friends: from } }
      );
      return { friendA, friendB };
    },
    createChat: async (parent, { users }) => {
      const newChat = await Chat.create({ users });
      return newChat;
    },
    sendMessage: async (parent, { chatId, message, sentBy }) => {
      const newMessage = await Chat.findByIdAndUpdate(chatId, {
        $push: { messages: { message, sentBy } },
      });
    },
  },
};
module.exports = resolvers;
