const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const userSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      max: 32,
      lowercase: true,
    },
    profile: {
      type: String,
      require: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
  },
  { timeStamp: true },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    // created  a temp variable
    this._password = password;

    // creaTE  salt
    this.salt = this.makeSalt();
    // encrpyted password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this.__password;
  });

userSchema.methods = {
  autehenticate: function (plaintext) {
    return this.encryptPassword(plaintext) == this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) {
      console.log("password is not added ");
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.random();
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
