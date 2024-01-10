"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true, length: 50 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_test", userModel);
