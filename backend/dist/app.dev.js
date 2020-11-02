"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var mongoose = require("mongoose");

var Post = require("./models/post");

mongoose.connect("mongodb+srv://shrikant:Mongo@123@cluster0.mo0qq.mongodb.net/node-angular?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(function () {
  console.log("Connection successful!");
})["catch"](function (error) {
  console.error(error);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.post("/api/post", function (req, res, next) {
  var post = new Post({
    title: req.body.title,
    body: req.body.body,
    userId: 1
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: "Post added successfully!"
  });
  next();
});
app.get("/api/posts", function (req, res, next) {
  Post.find().then(function (document) {
    console.log(document);
    res.status(200).json({
      message: "Posts fetch successfully!",
      posts: document
    });
  })["catch"](function (error) {
    console.error(error);
  });
});
module.exports = app;