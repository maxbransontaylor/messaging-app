const { User, Chat } = require("../models");

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

            return me

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
            const chatExists = await Chat.find({ users: users })
            if (chatExists && chatExists.length) {

                return chatExists
            }
            const newChat = await Chat.create({ users });
            users.forEach(async (user) => {
                await User.findOneAndUpdate({ _id: user }, { $push: { chats: newChat._id } })

            })
            return newChat;
        },
        sendMessage: async (parent, { chatId, message, sentBy }) => {
            console.log(sentBy)
            const user = await User.findById(sentBy)
            console.log(user)

            const newMessage = await Chat.findByIdAndUpdate(chatId, {
                $push: { messages: { message, sentBy, sentByUsername: user.username } }
            }, { new: true })


            console.log(newMessage)
            return newMessage
        },
    },
};
module.exports = resolvers;
