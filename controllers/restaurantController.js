const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res, next) => {
  try {
    const foundRestaurants = await Restaurant.find();

    res.status(200).json({
      message: "Successfully found restaurants",
      data: foundRestaurants,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const foundRestaurant = await Restaurant.findById(req.params.id);

    res.status(200).json({
      message: `Successfully found restaurant with name ${foundRestaurant.name}`,
      status: 200,
      data: foundRestaurant,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const restaurantToCreate = {
      name: req.body.name,
      address: req.body.address,
      typeOfFood: req.body.typeOfFood,
    };

    const createdRestaurant = await Restaurant.create(restaurantToCreate);

    res.status(201).json({
      data: createdRestaurant,
      message: `Successfully created restaurant with name ${createdRestaurant.name}`,
      status: 201,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
