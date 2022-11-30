const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Recipes = require("../models/recipeModel");

const {
  getAllRecipe,
  createRecipe,
  getRecipe,
  bookmarkRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipeController");

router.get("/recipes", getAllRecipe);
router.get("/recipes/:id", getRecipe);
router.post("/recipes", auth, createRecipe);
router.patch("/recipes/:id", auth, updateRecipe);
router.delete("/recipes/:id", auth, deleteRecipe);
router.post("/recipes/:id/bookmark", auth, bookmarkRecipe);

module.exports = router;
