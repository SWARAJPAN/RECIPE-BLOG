const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "name cannot be empty"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: [8, "password cannot be more than 8 characters"],
      unique: true,
    },
    publishedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
    bookmarkedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
  },
  { timestamps: true }
);

const Users = new mongoose.model("users", UserSchema);
module.exports = Users;
