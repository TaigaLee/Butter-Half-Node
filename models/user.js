const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: Integer,
    required: true
  },
  bio: String,
  age: {
    type: Integer,
    required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
