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

//edit route

router.get("/edit", async (req, res, next) => {
  try {
    if (req.session.loggedIn) {
      const userToEdit = await User.findById(req.session.userId);

      res.status(200).json({
        data: userToEdit,
        message: "Successfully found user to edit",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/edit", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      req.body
    );

    res.status(200).json({
      message: "Successfully updated user",
    });
  } catch (err) {
    next(err);
  }
});

// delete route
router.delete("/", async (req, res, next) => {
  try {
    const deletedUser = await User.deleteOne({
      username: req.session.username,
    });

    await req.session.destroy();

    res.status(200).json({
      message: "Successfully deleted user",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
