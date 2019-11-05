"use strict";

const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const { email, username, imageUrl, password } = req.body;
  User.signUp({ email, username, imageUrl, password })
    .then(user => {
      console.log("user", user);
      req.session.user = {
        _id: user._id
      };
      res.json({ type: "success", user });
    })
    .catch(error => {
      console.log("ERROR");
      next(error);
    });
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.signIn({ email, password })
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      res.json({ type: "success", user });
    })
    .catch(error => {
      next(error);
    });
};

exports.signOut = (req, res, next) => {
  req.session.destroy();
  res.json({ type: "success" });
};

exports.verify = (req, res, next) => {
  res.json({
    type: "success",
    user: {
      ...(req.user && { user: req.user })
    }
  });
};
exports.loadUser = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      res.json({ type: "success", user });
    })
    .catch(error => {
      next(error);
    });
};
