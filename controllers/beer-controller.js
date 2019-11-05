"use strict";
require("dotenv").config();

const Beer = require("../models/beer");
const User = require("./../models/user");

exports.create = (req, res, next) => {
  const { name, description, type, style, country, abv } = req.body;
  Beer.create({
    name,
    description,
    type,
    style,
    country,
    abv,
    _createdBy: req.user._id
  })
    .then(beer => {
      console.log("beer", beer);
      res.json({ type: "success", beer });
    })
    .catch(error => {
      console.log("error", error);
      next(error);
    });
};

exports.loadUser = (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then(user => {
      console.log(user._id);
      Beer.find({ _createdBy: user._id })
        .sort({ createdAt: -1 })
        .populate("_createdBy")
        .then(beers => {
          console.log("beers", beers);
          res.json({ type: "success", beers });
        })
        .catch(error => {
          next(error);
        });
    })
    .catch(error => console.log(error));
};

exports.loadAll = (req, res, next) => {
  Beer.find()
    .sort({ createdAt: -1 })
    .populate("_createdBy")
    .then(beers => {
      res.json({ type: "success", beers });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadSingle = (req, res, next) => {
  Beer.findById(req.params.id)
    .populate("_createdBy")
    .then(beer => {
      res.json({ type: "success", beer });
    })
    .catch(error => {
      next(error);
    });
};

exports.byType = (req, res, next) => {
  console.log(req.params.type);
  Beer.find({ $or: [{ type: req.params.type }, { style: req.params.type }] })
    .then(beers => {
      res.json({ type: "success", beers });
    })
    .catch(error => {
      next(error);
    });
};
