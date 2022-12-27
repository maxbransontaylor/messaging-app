const { User } = require('../models')

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.find({})
            return users
        }
    },
    Mutation: {
        addUser: async (parent, data) => {
            const user = await User.create(data)
            return user
        }
    }
}
module.exports = resolvers