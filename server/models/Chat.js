const { Schema, model } = require("mongoose");
const messageSchema = require("./Message");

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "user" }],
  messages: [messageSchema],
});
