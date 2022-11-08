const mongoose = require("mongoose");

const IngredientsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ingredients = new mongoose.model("ingredients", IngredientsSchema);
module.exports = Ingredients;
