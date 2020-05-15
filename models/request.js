const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurantName: String,
  restaurantAddress: String,
  restaurantCity: String,
  timePosted: {
    type: Date,
    default: Date.now,
  },
  extraInfo: String,
  typeOfDate: {
    type: String,
    enum: ["date", "friends", "either"],
  },
  typeOfFood: String,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
