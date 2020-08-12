const { User } = require("../models");
const checkIfIsAuthenticated = require("../auth/checkIfIsAuthenticated");
const signToken = require("../auth/signToken");

const resolvers = {
  Query: {
    books: checkIfIsAuthenticated(() => {
      return [];
    }),
  },
  Mutation: {
    signup: async (_) => {
      return {
        access_token: signToken(user._id),
      };
    },
    signin: async (_, { login, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ email: login }, { username: login }],
        }).exec();
        if (!user) {
          throw Error("login is not registered");
        }
        if (!user.verifyPassword(password)) {
          throw Error("password is wrong");
        }
        return {
          access_token: signToken(user._id),
        };
      } catch (err) {
        console.log("Login error", err);
      }
    },
  },
};

module.exports = resolvers;
