const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
      required: [true, "password cannot be empty"],
      minLength: [8, "password should be at least 8 characters"],
      trim: true,
    },
    publishedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
        // unique: true,
      },
    ],

    likedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],

    bookmarkedRecipe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
        // unique: true,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

const Users = new mongoose.model("users", UserSchema);
module.exports = Users;
