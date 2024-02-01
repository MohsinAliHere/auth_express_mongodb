const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    jwt.verify(token, "ImpKey", (err, decoded) => {
      if (err) {
        return res.json({
          msg: "Invalid token",
          success: false,
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.json({
      msg: error.message,
      success: false,
    });
  }
};

module.exports = verifyToken;
