const { createToken } = require("../common/jwtPassword");
const Auth_Schema = require("../model/auth");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        msg: "username, email, or password are required",
        success: false,
      });
    }

    // Check if the email already exists
    const existsUser = await Auth_Schema.exists({ email });
    if (existsUser) {
      return res.status(409).json({
        msg: "Email already exists try another",
        success: false,
      });
    }

    // Hash the password
    const securePassword = await bcrypt.hash(password, 10);

    // Create a new user
    const payload = {
      username,
      email,
      password: securePassword,
    };
    const user = await Auth_Schema.create(payload);

    // remove the password from the response
    const { password: excludedPassword, ...userData } = user.toObject();

    return res.status(201).json({
      data: userData,
      msg: "User registered successfully",
      success: true,
      token: createToken(user.id),
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const existsUser = await Auth_Schema.findOne({ email });
    if (!existsUser) {
      return res.status(401).json({
        success: false,
        error: "Email not found",
      });
    }

    // Compare passwords
    const matchPassword = bcrypt.compare(password, existsUser.password);
    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }

    // remove the password from the response
    const { password: excludedPassword, ...userData } = existsUser.toObject();

    return res.status(200).json({
      success: true,
      data: userData,
      message: "User logged in successfully",
      token: createToken(userData.id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const authChecker = async (req, res) => {
  try {
    const getUser = await Auth_Schema.findById(req.userId).select("-password");
    res.status(200).json({
      data: getUser,
      success: true,
      message: "Authentication successfull",
      token: createToken(getUser.id),
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  authChecker,
};
