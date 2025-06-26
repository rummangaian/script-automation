const userService = require("../services/userService");

const addUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await userService.addUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

module.exports = {
  addUserController,
};
