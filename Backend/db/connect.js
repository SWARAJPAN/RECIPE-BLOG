const mongoose = require("mongoose");

url = process.env.url;

const connectDB = async () => {
  //   console.log("connected to db");
  return await mongoose.connect(url);
};

module.exports = connectDB;
