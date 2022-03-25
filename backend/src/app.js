const express = require("express");
const cors = require("cors");

const app = express();

const port = parseInt(require("../../misc.json").PORT);
// settings
app.set("port", port);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/notes", require("./routes/notes"));

module.exports = app;
