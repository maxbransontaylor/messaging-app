const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/messaging-app3"
);

module.exports = mongoose.connection;
