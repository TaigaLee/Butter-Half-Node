const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    if (req.session.loggedIn) {
      const currentUser = await User.findById(req.session.userId);

      res.status(200).json({
        data: currentUser,
        message: "Successfully found user",
      });
    } else {
      res.status(401).json({
        message: "Not logged in",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
