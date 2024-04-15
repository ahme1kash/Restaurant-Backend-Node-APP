const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");
const router = express.Router();
//routes
//Register || POSt
router.post("/register", registerController);
router.post("/login", loginController);
module.exports = router;
