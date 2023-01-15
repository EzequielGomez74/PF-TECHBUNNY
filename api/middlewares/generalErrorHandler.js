function generalErrorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  res.status(status).send(message);
}

module.exports = generalErrorHandler;
