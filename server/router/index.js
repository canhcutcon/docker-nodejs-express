const route = (app) => {
  app.use("/api/user", require("./user"));
  app.use("/", (req, res) => res.json({ message: "Welcome to the API" }));
};

module.exports = route;
