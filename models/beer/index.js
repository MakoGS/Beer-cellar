"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    sparse: true,
    enum: ["Ale", "Lager", "Malt", "Stout"]
  },
  style: {
    type: String,
    required: true,
    sparse: true,
    enum: ["Amber", "Blonde", "Brown", "Cream", "Dark", "Pale"]
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  abv: {
    type: String,
    required: true,
    trim: true
  },
  // trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Beer = mongoose.model("Beer", schema);

module.exports = Beer;
