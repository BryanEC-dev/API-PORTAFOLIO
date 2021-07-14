const log4js = require("log4js");


log4js.configure({
    appenders: { portafolio: { type: "file", filename: "portfolio.log" } },
    categories: { default: { appenders: ["portafolio"], level: "debug" } }
  });

  let logger = log4js.getLogger('portafolio');

  module.exports = logger