const Users = require("../models/userModel");

//get user
const getUser = async (req, res) => {
  try {
    const user = await Users.find({}); //.populate("publishedRecipe", "name"); --> to show recipe and its name as an object
    res.status(200).json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//create user
const createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json({ message: "success", user });
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
    res.status(500).json({ message: error });
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
  getUser,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
};
