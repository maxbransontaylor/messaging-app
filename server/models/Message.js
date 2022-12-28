const { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    message: { type: String, req: true },
    sentBy: { type: Schema.Types.ObjectId, ref: 'user', req: true },
    sentByUsername: { type: String }
  },
  { timestamps: true }
);
module.exports = messageSchema;
