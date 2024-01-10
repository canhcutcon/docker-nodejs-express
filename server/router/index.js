const route = (app) => {
  app.use("/api/user", require("./user"));
};

module.exports = route;
