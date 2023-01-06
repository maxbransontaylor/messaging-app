const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  friends: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "user" },
      status: {
        type: String,
        enum: ["sent", "received", "accepted", "declined"],
      },
    },
  ],
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "chat",
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.method.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
