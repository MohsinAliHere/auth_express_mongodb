const { register, login, authChecker } = require("../controller/auth");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth_Check", verifyToken, authChecker);

module.exports = router;
