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
    likes: {
      type: Number,
    },

    instruction: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
    ethnicity: {
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
