const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI;

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  client.close();
});

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to butterhalf db");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from butterhalf db");
});

mongoose.connection.on("error", (err) => {
  console.log("Error with database connection");
  console.log(err);
});
