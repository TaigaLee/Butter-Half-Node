const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: String,
  timePosted: {
    type: Date,
    default: Date.now,
  },
  extraInfo: String,
  typeOfDate: String,
  viewed: Boolean,
  accepted: Boolean,
});

const User = mongoose.model("Request", requestSchema);

module.exports = Request;
