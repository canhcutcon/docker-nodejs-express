const UserController = {};

UserController.register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await UserService.createUser({ email, password, name });
  return res.json({
    status: 200,
    message: "User created successfully",
    data: user,
  });
};

UserController.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getUser(id);
  return res.json({
    status: 200,
    message: "User retrieved successfully",
    data: user,
  });
};

module.exports = UserController;
