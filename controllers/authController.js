const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  try {
    if (req.body.password === req.body.verifyPassword) {
      const desiredUsername = req.body.username;
      const checkUsername = await User.findOne({
        username: desiredUsername
      });
    }
  } catch (err) {
    next(err);
  }
});
