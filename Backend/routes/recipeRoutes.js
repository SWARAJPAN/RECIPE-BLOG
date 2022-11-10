const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getAllRecipe,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controller/recipeController");

router.get("/recipes", getAllRecipe);
router.get("/recipes/:id", getRecipe);
router.post("/recipes", auth, createRecipe);
router.patch("/recipes/:id", auth, updateRecipe);
router.delete("/recipes/:id", auth, deleteRecipe);

module.exports = router;
