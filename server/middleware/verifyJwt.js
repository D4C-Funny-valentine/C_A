const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401);
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403);
    } else {
      req.email = decoded.email;
      next();
    }
  });
};

module.exports = { verifyToken };
