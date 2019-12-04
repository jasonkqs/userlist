
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/", ({}, res) => {
  res.status(200).json({ message: "Welcome" });
});

router.get("/users", ({}, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(users);
  });
});

router.get("/users/:userId", (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
});

router.put("/users/:userId", (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    const body = req.body;

    for (let prop in body) {
      if (prop === "_id") {
        continue;
      }
      user[prop] = body[prop];
    }
    user.save(err => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: "User updated!" });
    });
  });
});

router.post("/users", (req, res) => {
  const newUser = new User(req.body);

  newUser.save(err => {
    if (err) {
      res.status(501).send(err);
    }
    res.status(200).json({ message: "User created! " });
  });
});


router.delete("/users/:userId", (req, res) => {
  User.deleteOne(
    {
      _id: req.params.userId
    },
    err => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: "User deleted!" });
    }
  );
});

module.exports = router;
