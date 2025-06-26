const userModel = require("../models/userModel");

const addUser = async (username, email, password) => {
  const newUser = await userModel.createUser(username, email, password);
  return newUser;
};

module.exports = {
  addUser,
};
