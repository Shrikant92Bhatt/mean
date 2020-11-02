const express = require('express');

const router = express.Router();
const Post = require("../models/post");


router.post("", async (req, res, next) => {
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

router.get("/", (req, res, next) => {
    console.log(req)
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

router.put("/:id", (request, response, next) => {
  const post = new Post({
    _id: request.params.id ,
    title: request.body.title,
    body: request.body.body,
    userId: 1,
  })
  console.log(request.params.id);
  Post.updateOne({ _id: request.params.id }, post)
    .then((data) => {
    response.status(200).json({message:"Post updated successfully!", post:data})
  })
})

router.delete("/:id", (req, res, next) => {
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


module.exports = router;