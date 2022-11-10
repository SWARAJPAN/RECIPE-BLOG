const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//user signup
const signUp = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new Users({
      name: req.body.name,
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
        res.status(500).json({
          error: error.message,
        });
      });
  });
};

//user login
const logIn = async (req, res, next) => {
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
            expiresIn: "24h",
          });

          res.status(200).json({
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

//create user
const createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user
const getUser = async (req, res) => {
  try {
    const user = await Users.find({}); //.populate("publishedRecipe", "name"); --> to show recipe and its name as an object
    res.status(200).json({ message: "success", user, length: user.length });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get singe user
const getOneUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findById(userId);

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
    const user = await Recipes.findByIdAndDelete(userID);
    if (!user) {
      return res
        .status(404)
        .json({ message: `No user with id: ${userID} found.` });
    }
    res
      .status(200)
      .json({ message: `Recipe with id ${userID} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  signUp,
  logIn,
  getUser,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
};
