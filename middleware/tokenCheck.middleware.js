const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      message: "A token is required for authentication",
      statusCode: 403,
    });
  }
  try {
    const decoded = jwt.verify(token, "123456789", {
      algorithms: ["HS256"],
    });
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", statusCode: 401 });
  }
  return next();
};

module.exports = verifyToken;