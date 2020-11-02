const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const postRouter = require("./routes/posts");

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

app.use("/api/posts",postRouter);
module.exports = app;
