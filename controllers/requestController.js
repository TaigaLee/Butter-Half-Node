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
      status: 200,
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
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

// post route
router.post("/new", async (req, res, next) => {
  try {
    const requestToCreate = {
      restaurantName: req.body.restaurantName,
      restaurantAddress: req.body.restaurantAddress,
      restaurantCity: req.body.restaurantCity,
      user: req.session.userId,
      extraInfo: req.body.extraInfo,
      typeOfDate: req.body.typeOfDate,
    };

    const createdRequest = await Request.create(requestToCreate);

    res.status(201).json({
      data: createdRequest,
      message: "Successfully created request",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (request.user == req.session.userId) {
      const requestToDelete = await Request.findByIdAndDelete(req.params.id);

      res.status(200).json({
        data: requestToDelete,
        message: "Successfully deleted request",
        status: 200,
      });
    } else {
      res.status(401).json({
        message: "You can't do that!",
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (request.user == req.session.userId) {
      const foundRequest = await Request.findById(req.params.id);

      res.json({
        data: foundRequest,
        message: "Successfully found request to edit",
        status: 200,
      });
    } else {
      res.status(401).json({
        message: "You can't do that!",
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.id);

    if (request.user == req.session.userId) {
      const requestToUpdate = {
        restaurant: req.body.restaurant,
        extraInfo: req.body.extraInfo,
        typeOfDate: req.body.typeOfDate,
      };

      const updatedRequest = await Request.findByIdAndUpdate(
        req.params.id,
        requestToUpdate
      );

      res.status(200).json({
        message: "Successfully updated request",
        data: updatedRequest,
        status: 200,
      });
    } else {
      res.status(401).json({
        message: "You can't do that!",
        status: 401,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
