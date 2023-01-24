const { User } = require("../../services/db/db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleRefreshToken(cookie) {
  let accessToken = null;
  try {
    const foundUser = await User.findOne({ where: { refreshToken: cookie } });
    //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)
    if (!foundUser) throw new Error("not found");
    jwt.verify(
      foundUser.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err || foundUser.username !== decode.username)
          throw new Error("not found");
        accessToken = jwt.sign(
          { username: foundUser.username, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "5m",
          }
        );
      }
    );
    return accessToken;
  } catch (error) {
    return accessToken;
  }
}

module.exports = { handleRefreshToken };
