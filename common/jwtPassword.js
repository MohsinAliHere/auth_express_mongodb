const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "ImpKey");
};
const verifyToken = (token) => {
  return jwt.verify(token, "ImpKey");
};

module.exports = {
  createToken,
  verifyToken,
};
