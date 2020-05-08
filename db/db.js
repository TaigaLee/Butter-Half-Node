const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("Connected to butterhalf db");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from butterhalf db");
});

mongoose.connection.on("error", err => {
  console.log("Error with database connection");
  console.log(err);
});
