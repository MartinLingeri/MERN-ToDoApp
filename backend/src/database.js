const mongoose = require("mongoose");

const URI = require("../../misc.json").MOGODB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});
