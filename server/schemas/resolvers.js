const { User, Chat } = require("../models");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
    me: async (parent, { userId }) => {
      const me = await User.findById(userId).populate({
        path: "chats",
        populate: { path: "messages" },
        populate: { path: "users" },
      });

      return me;
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
        { $push: { friends: { userId: to, status: "sent" } } },
        { new: true }
      );
      const friendB = await User.update(
        { _id: to },
        { $push: { friends: { userId: from, status: "received" } } },
        { new: true }
      );

      return friendA;
    },
    confirmFriend: async (parent, { from, to }) => {
      const sendingUser = await User.findById(from);
      //   check that the user confirming the request is the one who received it

      const hasRequest = sendingUser.friends.filter((friend) => {
        if (friend.userId.equals(to) && friend.status === "received") {
          return true;
        } else {
          return false;
        }
      });

      if (!hasRequest.length) {
        throw new GraphQLError("YOU DO NOT HAVE A REQUEST FROM THIS PERSON", {
          extensions: { code: "NO_FRIEND_REQUEST" },
        });
      }
      // update each friend list to be accepted
      const updateSender = await User.updateOne(
        { "friends.userId": to },
        { $set: { "friends.$.status": "accepted" } },
        { new: true }
      );
      const updateReceiver = await User.updateOne(
        { "friends.userId": from },
        { $set: { "friends.$.status": "accepted" } },
        { new: true }
      );

      return updateSender;
    },
    createChat: async (parent, { users }) => {
      // check if a chat with these users already exists
      const chatExists = await Chat.find({ users: users });
      if (chatExists && chatExists.length) {
        return chatExists;
      }
      const newChat = await Chat.create({ users });
      users.forEach(async (user) => {
        await User.findOneAndUpdate(
          { _id: user },
          { $push: { chats: newChat._id } }
        );
      });
      return newChat;
    },
    sendMessage: async (parent, { chatId, message, sentBy }) => {
      //get username by id
      const user = await User.findById(sentBy);

      const newMessage = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: { message, sentBy, sentByUsername: user.username },
          },
        },
        { new: true }
      );

      console.log(newMessage);
      return newMessage;
    },
  },
};
module.exports = resolvers;
