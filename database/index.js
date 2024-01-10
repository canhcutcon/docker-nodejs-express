const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");
const database = config.get("database");

mongoose.set("strictQuery", false);

const MONGO_EVENTS = {
  TIMEOUT: "timeout",
  ERROR: "error",
  RECONNECTED: "reconnected",
};

const DB_LOG_MESSAGES = {
  reconnectSuccess: "Reconnect MongoDB success !!!",
  reconnectFailed: "Reconnect MongoDB success !!!",
  connectFailed: "Could not connect to MongoDB !!!",
  connectSuccess: "Connect MongoDB success !!!",
  timeout: "db: mongodb timeout",
};

const connectMongo = (cb) => {
  mongoose
    .connect(database.uri)
    .then(async () => {
      console.info(DB_LOG_MESSAGES.connectSuccess);
      console.log(database.uri);
      require("./model");
      if (cb) {
        cb();
      }
    })
    .catch((err) => {
      console.error(DB_LOG_MESSAGES.connectFailed);
      console.error(err);
    });
};

const reconnectMongo = () => {
  mongoose
    .connect(database.uri)
    .then(() => {
      console.info(DB_LOG_MESSAGES.reconnectSuccess);
      console.log(database.uri);
    })
    .catch((err) => {
      console.error(DB_LOG_MESSAGES.reconnectFailed);
      console.error(err);
    });
};

const listenTimeoutEvent = () => {
  mongoose.connection.on(MONGO_EVENTS.TIMEOUT, function (e) {
    console.error(DB_LOG_MESSAGES.timeout + e);
    // reconnect here
    mongoose.disconnect();
    reconnectMongo();
  });
};

const listenErrorEvent = () => {
  mongoose.connection.on(MONGO_EVENTS.ERROR, function (e) {
    console.error(DB_LOG_MESSAGES.connectFailed + e);
    // reconnect here
    mongoose.disconnect();
    reconnectMongo();
  });
};

const listenReconnectedEvent = () => {
  mongoose.connection.on(MONGO_EVENTS.RECONNECTED, function () {
    console.info("MongoDB reconnected!");
  });
};

const listenMongoEvents = () => {
  listenTimeoutEvent();
  listenErrorEvent();
  listenReconnectedEvent();
};

module.exports = {
  listenMongoEvents,
  connectMongo,
};
