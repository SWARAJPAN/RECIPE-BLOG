const Users = require("../models/userModel");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({}); //.find({})

    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ success: true, data: { tasks, amount: tasks.length } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
