const express = require("express");
// const { updateRecipe } = require("../controller/recipeController");
const router = express.Router();

const {
  getUser,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");

router.get("/users", getUser);
router.post("/users", createUser);
router.get("/users/:id", getOneUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
