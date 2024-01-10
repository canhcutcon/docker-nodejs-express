require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./router");
const { connectMongo, listenMongoEvents } = require("../database");

const PORT = process.env.PORT || 3000;
const server = require("http").Server(app);

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

route(app);

connectMongo();
listenMongoEvents();

server.listen(PORT, () => {
  console.log(`User server is running in http://localhost:${PORT}`);
});
