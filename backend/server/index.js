"use strict";
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const router = require("../router");
const dbURL = "mongodb://localhost:27017/user-list";
// const apiUsersURL = "http://localhost:8081/api/users";
const port = process.env.PORT || 8081;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Resource-With, Content-Type, Accept"
  );
  console.log(`request method & url: ${req.method}: ${req.url}`);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);
app.listen(port, () => console.log(`Listening on port ${port}`));

mongoose.connect(dbURL, { useNewUrlParser: true });
