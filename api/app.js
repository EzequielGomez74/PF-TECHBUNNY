const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const generalErrorHandler = require("./middlewares/generalErrorHandler");
const accessControl = require("./middlewares/accessControl");
const credentials = require("./middlewares/credentials");
const indexRouter = require("./routes/index.js");
const corsOptions = require("./config/corsOptions");
require("./services/db/db.js");

const server = express();
server.name = "API";
//asd
console.log("0");
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
console.log("1");
server.use(accessControl);
console.log("2");
server.use(credentials);
console.log("3");
server.use(cors(corsOptions));
console.log("4");

server.use("/", indexRouter);

// server.use(cuatrocientoscuatro)
// Error catching endware.
server.use(generalErrorHandler);
//FIN DE MIDDLEWARES

module.exports = server;
