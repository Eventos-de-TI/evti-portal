const { sign } = require("jsonwebtoken");
const config = require("../config/environment");

const signToken = (id) => {
  sign({ _id: id }, config.auth.secret, (err, token) => {
    if (err) {
      throw err;
    }
    return token;
  });
};

module.exports = signToken;
