require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();

//import recipe router
const recipeRouter = require("./routes/recipeRoutes");
//import user router
const userRouter = require("./routes/userRoutes");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", recipeRouter);
app.use("/api/v1", userRouter);

app.listen(port, async () => {
  await connectDB().then((c) => console.log("db connected"));
  console.log("connect to port 3000");
});

app.use(express.json());
