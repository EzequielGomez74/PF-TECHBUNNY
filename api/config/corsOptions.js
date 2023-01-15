const allowedOrigins = require("./allowOrigins.js");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
module.exports = corsOptions;
