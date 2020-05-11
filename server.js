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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//controllers

const authController = require("./controllers/authController.js");
app.use("/auth", authController);

const userController = require("./controllers/userController.js");
app.use("/user", userController);

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  const d = new Date();
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
});
