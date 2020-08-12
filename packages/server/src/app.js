"use strict";

const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/environment");
const app = require("express")();

mongoose.connect(config.mongo.uri, config.mongo.options);

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

app.use(passport.initialize());

module.exports = app;
