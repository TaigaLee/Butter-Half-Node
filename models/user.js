const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  profilePicture: String,
  bio: String,
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
