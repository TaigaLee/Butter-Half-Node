const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
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
    type: String,
    required: true,
  },
  profilePicture: String,
  bio: String,
  age: {
    type: Number,
    required: true,
  },
  postedRequests: [
    {
      type: String,
    },
  ],
  requested: [
    {
      type: String,
    },
  ],
  sentRequests: [
    {
      type: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
