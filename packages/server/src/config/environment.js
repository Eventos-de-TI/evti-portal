const path = require("path");
const deepFreeze = require("deep-freeze");

const config = deepFreeze({
  port: process.env.PORT || "9000",
  ip: process.env.IP || "0.0.0.0",
  root: path.normalize(__dirname + "/../.."),
  mongo: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  auth: {
    secret: process.env.SECRET_PHRASE,
  },
});

module.exports = config;
