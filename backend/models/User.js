"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  sex: String,
  age: Number,
  password: String
});

const User = mongoose.model("user", UserSchema, "user");

module.exports.User = User;
