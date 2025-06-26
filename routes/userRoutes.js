const express = require("express");
const { addUserController } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/create-user", addUserController);

module.exports = userRouter;
