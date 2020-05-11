const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.status(200).json({
    message: "Register route!",
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const desiredUsername = req.body.username;
    const desiredPassword = req.body.password;

    const checkUsername = await User.findOne({
      username: desiredUsername,
    });

    if (checkUsername) {
      res.status(401).json({
        message: "Username already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const bcryptPassword = bcrypt.hashSync(desiredPassword, salt);
      const createdUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcryptPassword,
        age: req.body.age,
        location: req.body.location,
        bio: req.body.bio,
      });

      res.status(200).json({
        data: createdUser,
        message: "Successfully created user",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
