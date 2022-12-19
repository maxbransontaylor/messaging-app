const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/messaging-app"
);

module.exports = mongoose.connection;
