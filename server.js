require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const session = require("express-session");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

require("./db/db.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//controllers

const authController = require("./controllers/authController.js");
app.use("/auth", authController);

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  const d = new Date();
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
});
