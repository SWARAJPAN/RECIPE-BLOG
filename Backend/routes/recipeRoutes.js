const express = require("express");
const router = express.Router();

const {
  getAllRecipe,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipeController");

router.get("/recipes", getAllRecipe);
router.post("/recipes", createRecipe);
router.get("/recipes/:id", getRecipe);
router.patch("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

module.exports = router;
