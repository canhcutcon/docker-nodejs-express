const userRouter = require("express").Router();
const userController = require("../controller/user");

userRouter.post("/register", userController.register);
userRouter.get("/:id", userController.getUser);

module.exports = userRouter;
