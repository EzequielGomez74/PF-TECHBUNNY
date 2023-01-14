function accessControl(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://pf-techbunny-lake.vercel.app"
  ); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}
module.exports = accessControl;

//! setear res.header("Access-Control-Allow-Origin","https://pf-techbunny-lake.vercel.app") para deploy
//! setear res.header("Access-Control-Allow-Origin","http://localhost:3000") para local
