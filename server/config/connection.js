const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/messaging-app2"
);

module.exports = mongoose.connection;
