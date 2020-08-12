const { verify } = require("jsonwebtoken");
const config = require("../config/environment");

const decodeToken = (token) => {
  verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      throw err;
    }
    return decoded;
  });
};

module.exports = decodeToken;
