const { User } = require("../../services/db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleRefreshToken(cookie) {
  const foundUser = await User.findOne({ where: { refreshToken: cookie } });
  //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
  if (!foundUser) throw new Error({ statusCode: 402, msg: "not found" });
  let accessToken = null;
  jwt.verify(
    foundUser.refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decode) => {
      if (err || foundUser.name !== decode.username)
        throw new Error({ statusCode: 401, msg: "not found" });
      accessToken = jwt.sign(
        { username: foundUser.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15s",
        }
      );
    }
  );
  return accessToken;
}

module.exports = { handleRefreshToken };
