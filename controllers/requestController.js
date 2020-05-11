const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Request = require("../models/request");

//get route
router.get("/", async (req, res, next) => {
  try {
    const foundRequests = await Request.find().populate("user");

    res.status(200).json({
      data: foundRequests,
      message: "Successfully found requests",
    });
  } catch (err) {
    next(err);
  }
});

// show route
router.get("/:id", async (req, res, next) => {
  try {
    const foundRequest = await Request.findById(req.params.id).populate("user");

    res.status(200).json({
      data: foundRequest,
      message: "Successfully found request",
    });
  } catch (err) {
    next(err);
  }
});

// post route
router.post("/", async (req, res, next) => {
  try {
    const requestToCreate = {
      restaurant: req.body.restaurant,
      user: req.session.userId,
      extraInfo: req.body.extraInfo,
      typeOfDate: req.body.typeOfDate,
    };

    const createdRequest = await Request.create(requestToCreate);

    res.status(201).json({
      data: createdRequest,
      message: "Successfully created request",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
