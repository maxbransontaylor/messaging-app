const { Schema } = require("mongoose");

const messageSchema = {
  message: { type: String, req: true },
  created_at: { type: Date, default: Date.now },
};
module.exports = messageSchema;
