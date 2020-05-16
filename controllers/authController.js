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
    const desiredEmail = req.body.email;
    const desiredPassword = req.body.password;
    const desiredChatUsername = req.body.chatUsername;

    const checkEmail = await User.findOne({
      email: desiredEmail,
    });

    const checkChatUsername = await User.findOne({
      chatUsername: desiredChatUsername,
    });

    if (checkEmail && checkChatUsername) {
      res.status(401).json({
        message: "Email or chat username already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const bcryptPassword = bcrypt.hashSync(desiredPassword, salt);
      const createdUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPassword,
        age: req.body.age,
        location: req.body.location,
        bio: req.body.bio,
        chatUsername: req.body.chatUsername,
      });

      req.session.loggedIn = true;
      req.session.userId = createdUser._id;
      req.session.email = createdUser.email;
      req.session.name = createdUser.name;

      res.status(201).json({
        data: createdUser,
        message: "Successfully created user",
        status: 201,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const validLogin = bcrypt.compareSync(req.body.password, user.password);
      if (validLogin) {
        req.session.loggedIn = true;
        req.session.userId = user._id;
        req.session.email = user.email;
        req.session.name = user.name;
        res.status(200).json({
          data: user,
          message: "Successfully logged in",
        });
      } else {
        res.status(401).json({
          message: "Invalid password or email",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.status(200).json({
    message: "Successfully logged out",
    status: 200,
  });
});

module.exports = router;
