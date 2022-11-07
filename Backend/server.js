const express = require("express");

require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

app.listen(port, () => {
  console.log("connect to port 4000");
});

const connectDB = require("./db/connect");

app.use(express.json());

connectDB().then((c) => console.log("db connected"));
