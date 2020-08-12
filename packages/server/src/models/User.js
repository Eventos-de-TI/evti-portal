const mongoose = require("mongoose");
const crypto = require("crypto");

function makeSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function encryptPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString("base64");
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  encryptedPassword: String,
  salt: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  provider: String,
  facebook: {},
  github: {},
});

/*
  virtuals
*/

UserSchema.virtual("password")
  .set(function (password) {
    this.salt = makeSalt();
    this._password = password;
    this.encryptedPassword = encryptPassword(password, this.salt);
  })
  .get(function () {
    return this._password;
  });

UserSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (value) {
    const parts = value.split(" ");
    const first = parts[0];
    const last = parts[parts.length - 1];
    this.firstName = first;
    this.lastName = last;
  });

/*
 path validations
*/

UserSchema.path("email").validate({
  validator: (value) =>
    new Promise((resolve) => {
      this.findOne({ email: value })
        .exec()
        .then((user) => {
          if (user && user.id === this.id) {
            resolve(false);
          }
          resolve(true);
        })
        .catch((err) => {
          throw err;
        });
    }),
  message: "The specified email address is already in use.",
});

UserSchema.path("email").validate({
  validator: (email) => email.length,
  message: "Email cannot be blank",
});

/*
 methods 
*/
UserSchema.methods.verifyPassword = function (password) {
  return encryptPassword(password, this.salt) === this.encryptedPassword;
};

/* 
  hooks
*/

UserSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }
  if (!this.encryptedPassword || !this.encryptedPassword.length) {
    return next("Invalid password");
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
