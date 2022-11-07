const Recipes = require("../models/recipeModel");

//get all users
const getAllRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.find({}); //.find({})

    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ success: true, data: { tasks, amount: tasks.length } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
