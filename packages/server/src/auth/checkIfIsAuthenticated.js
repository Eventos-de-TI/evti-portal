const decodeToken = require("./decodeToken");

const User = require("../models/User");

checkIfIsAuthenticated = (next) => async (obj, data, context) => {
  try {
    const decodedToken = decodeToken(context.auth.access_token);
    const user = await User.findById(decodedToken._id).exec();
    if (!user) {
      throw new Error("user not exists");
    }
    return next(obj, data, context);
  } catch (err) {
    throw err;
  }
};

module.exports = checkIfIsAuthenticated;
