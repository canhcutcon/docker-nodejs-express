module.exports = class Logger {
  static success(message = "") {
    console.log("\x1b[32m" + message + "\x1b[0m");
  }
  static error(message = "") {
    console.error("\x1b[31m" + message + "\x1b[0m");
  }
  static info(message = "") {
    console.info("\x1b[36m" + message + "\x1b[0m");
  }
  static pending(message = "") {
    console.log("\x1b[33m" + message + "\x1b[0m");
  }
};
