const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  typeOfFood: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
