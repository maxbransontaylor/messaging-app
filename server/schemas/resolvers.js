const { User, Chat } = require("../models");
const { GraphQLError } = require("graphql");
const { signToken } = require("../utils/auth");
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
      if (data.username && data.email && data.password) {
        const user = await User.create(data);
        const token = signToken(user);
        return { token, user };
      }
      throw new GraphQLError("INCOMPLETE CREDENTIALS");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const correctPassword = await user.isCorrectPassword(password);
      console.log(user, correctPassword);
      if (!user || !correctPassword) {
        throw new GraphQLError("COULD NOT FIND USER WITH THESE CREDENTIALS");
      }
      const token = signToken(user);
      return { token, user };
    },
    addFriend: async (parent, { from, to }) => {
      // see if already friends or already requested
      try {
        const checkForExisting = await User.findById(to);
        if (
          checkForExisting.friends.some((friend) => friend.userId.equals(to))
            .length
        ) {
          throw new GraphQLError("ALREADY FRIENDS OR ALREADY REQUESTED", {
            extensions: { code: "DUPLICATE_FRIEND_ENTRY" },
          });
        }
        const updateFriendA = await User.updateOne(
          { _id: from, "friends.userId": { $ne: to } },
          { $push: { friends: { userId: to, status: "sent" } } },
          { new: true }
        );
        const updateFriendB = await User.updateOne(
          { _id: to, "friends.userId": { $ne: from } },
          { $push: { friends: { userId: from, status: "received" } } },
          { new: true }
        );

        return updateFriendA;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: { code: "ERROR ADDING FRIEND" },
        });
      }
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
        throw new GraphQLError("CHAT EXISTS WITH THIS USER(S) ");
      }
      // check if user creating chat is friends with everybody in chat
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
