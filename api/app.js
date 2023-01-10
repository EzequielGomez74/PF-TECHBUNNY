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
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(accessControl);
server.use(credentials);
server.use(cors(corsOptions));

server.use("/", indexRouter);

// server.use(cuatrocientoscuatro)
// Error catching endware.
server.use(generalErrorHandler);
//FIN DE MIDDLEWARES

module.exports = server;
