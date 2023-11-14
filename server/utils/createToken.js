const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET, EXPIRE_DATE } = process.env;

const createToken = async (
  data,
  secretToken = ACCESS_TOKEN_SECRET,
  expire = EXPIRE_DATE
) => {
  try {
    const accessToken = jwt.sign(data, secretToken, {
      expiresIn: expire,
    });

    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

module.exports = createToken;
