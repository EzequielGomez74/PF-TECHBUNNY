const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  generalErrorHandler,
  accessControl,
} = require("./middlewares/index.js");

require("./services/db/db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(accessControl);

// Error catching endware.
server.use(generalErrorHandler);

//FIN DE MIDDLEWARES

//404

module.exports = server;
