const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose
  .connect(
    "mongodb+srv://shrikant:Mongo@123@cluster0.mo0qq.mongodb.net/node-angular?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("Connection successful!");
  })
  .catch((error) => {
    console.error(error);
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", " Content-Type, Authorization");
  next();
});

app.post("/api/post/", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    userId: 1,
  });
  await post
    .save()
    .then((createdPost) => {
      console.log(createdPost);
      res.status(201).json({
        message: "Post added successfully!",
        post_id: createdPost._id,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  next();
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((document) => {
      // console.log(document);
      res
        .status(200)
        .json({ message: "Posts fetch successfully!", posts: document });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      // console.log(result);
      res
        .status(200)
        .json({ message: "Post Deleated", post_id: req.params.id });
    })
    .catch((error) => {
      console.error(error);
      res.status(200).json({ message: "error occured", error });
    });
});
module.exports = app;
