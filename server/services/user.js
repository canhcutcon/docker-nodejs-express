const UserModels = require("../../database/model/user");

const UserServices = {};

UserServices.createUser = async (user) => {
  const newUser = new UserModels(user);
  return newUser.save();
};

UserServices.getUser = async (id) => {
  return UserModels.findById(id);
};

module.exports = UserServices;
