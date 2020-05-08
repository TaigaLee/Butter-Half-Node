require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT;

require("./db/db.js");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(PORT, () => {
  const d = new Date();
  console.log(`${d.toLocaleString()}: Server listening on port ${PORT}`);
});
