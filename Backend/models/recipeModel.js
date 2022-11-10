const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name cannot be empty"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    like: {
      type: String,
    },

    instruction: {
      type: String,
      required: true,
    },
    cuisineTag: {
      type: String,
      trim: true,
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Recipes = new mongoose.model("recipe", RecipeSchema);
module.exports = Recipes;
