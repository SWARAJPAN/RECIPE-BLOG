require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;
const app = express();

//import reciperouter
const recipeRouter = require("./routes/recipeRoutes");

app.use(express.json());
app.use(bodyParser.json());
app.use("/api/v1", recipeRouter);

app.listen(port, async () => {
  await connectDB().then((c) => console.log("db connected"));
  console.log("connect to port 4000");
});

app.use(express.json());
