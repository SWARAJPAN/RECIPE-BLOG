const Recipes = require("../models/recipeModel");

//get all Recipes
const getAllRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.find(eval("(" + req.query.where + ")"))
      .select(eval("(" + req.query.select + ")"))
      .sort(eval("(" + req.query.sort + " )"))
      .skip(eval("(" + req.query.skip + " )"))
      .limit(eval("(" + req.query.limit + " )")); //.populate({ path: "publishedBy", select: "name , email", }); //.find({})

    res.status(200).json({ message: "success", recipe, length: recipe.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a new Recipe
const createRecipe = async (req, res) => {
  console.log("1");
  try {
    const recipe = await Recipes.create(req.body);
    console.log(recipe);
    // const data = await recipe.save();
    res.status(201).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get single Recipe
const getRecipe = async (req, res) => {
  console.log(req.params);
  const recipeID = req.params.id;
  console.log(recipeID);
  try {
    const recipe = await Recipes.findById(recipeID);

    if (!recipe) {
      return res.status(404).json({ message: `${recipeID} does not exist` });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update Recipe: patch method
const updateRecipe = async (req, res) => {
  const recipeID = req.params.id;
  // const updatedIngredients = req.body.ingredients;
  try {
    const recipe = await Recipes.findByIdAndUpdate(
      recipeID,
      req.body,
      // description: req.body.description, --> updation of any tags (i.e, name, desp, ingridnts) needs this syntax
      // $push: { ingredients: updatedIngredients },
      // { $pull: { ingredients: updatedIngredients } }, -- to delete duplicates
      {
        new: true,
        runValidators: true,
      }
    );
    if (!recipe) {
      return res
        .status(404)
        .json({ msg: `No recipe with id: ${recipeID} found.` });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete Recipe
const deleteRecipe = async (req, res) => {
  const recipeID = req.params.id;
  try {
    const recipe = await Recipes.findByIdAndDelete(recipeID);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `No recipe with id: ${recipeID} found.` });
    }
    res
      .status(200)
      .json({ message: `Recipe with id ${recipeID} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecipe,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
