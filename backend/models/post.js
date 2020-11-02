const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: Number },
  title: { type: String, required: true },
  body: { type: String, require: true },
});

module.exports = mongoose.model("Post", postSchema);
