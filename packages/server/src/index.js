"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config();

const config = require("./config/environment");
const server = require("./server");

server.listen(config.port, config.ip, () => {
  console.log(
    "Server ready at %s:%d on %s mode",
    config.ip,
    config.port,
    process.env.NODE_ENV
  );
});
