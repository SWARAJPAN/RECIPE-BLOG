const express = require("express");
// const { updateRecipe } = require("../controller/recipeController");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUser,
  getOneUser,
  getBookmarkedRecipe,
  updateUser,
  deleteUser,
  logIn,
  signUp,
} = require("../controller/userController");

router.get("/users", getUser);
router.get("/users/:id", getOneUser);
router.patch("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);
router.post("/users/signup", signUp);
router.post("/users/login", logIn);

module.exports = router;
