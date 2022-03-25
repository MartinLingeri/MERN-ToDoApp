const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: String,
    content: { type: String, required: true },
    date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Note", noteSchema);
