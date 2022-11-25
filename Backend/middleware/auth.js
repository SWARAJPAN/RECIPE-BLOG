const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  console.log("auth hit");
  try {
    console.log(req.headers, "req.headers");
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    console.log(userId, "userId");

    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      req.user = user;
      // console.log();
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
