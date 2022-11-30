const Users = require("../models/userModel");
const Recipes = require("../models/recipeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user signup
const signUp = async (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error.message,
        });
      });
  });
};

//user login
const logIn = async (req, res, next) => {
  console.log("signin hit");
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!"),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!"),
            });
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "1000h",
          });
          console.log(token);
          console.log("user not found"),
            res.status(201).json({
              message: "User loged in successfully!",
              userId: user._id,
              token: token,
            });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

//get user
const getUser = async (req, res) => {
  try {
    const user = await Users.find({}).populate(
      "bookmarkedRecipe",
      "name category"
    );
    //.populate("publishedRecipe", "name"); --> to show recipe and its name as an object
    res.status(200).json({ message: "success", user, length: user.length });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get singe user
const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById(userId)
      .populate(
        "bookmarkedRecipe",
        "name category createdAt ethnicity uploadImg "
      )
      .populate(
        "publishedRecipe",
        "name category createdAt ethnicity uploadImg"
      );

    if (!user) {
      return res.status(404).json({ message: `${userId} does not exist` });
    }
    res.status(200).json({ message: "found", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//update user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  //   const updatedPublishedRecipe = req.body.publishedRecipe;
  //   const updatedBookmarkedRecipe = req.body.bookmarkedRecipe;
  try {
    const { publishedRecipe, bookmarkedRecipe, ...rest } = req.body;

    const user = await Users.findByIdAndUpdate(
      userId,
      {
        // ...req.body,
        // $set: { ...req.body.profile },
        $set: { ...rest },
        $push: {
          publishedRecipe: publishedRecipe,
          bookmarkedRecipe: bookmarkedRecipe,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: `user id ${userId} does not exists` });
    }
    res.status(200).json({ message: "updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await Users.findByIdAndDelete(userID);
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with id: ${userID} found.` });
    }
    res
      .status(200)
      .json({ message: `User with id ${userID} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
};
