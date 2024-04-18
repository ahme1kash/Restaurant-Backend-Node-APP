const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userControllers");
const getUserMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
// Get User
router.get("/getUser", getUserMiddleware, getUserController);
// Update User
router.put("/updateUser", getUserMiddleware, updateUserController);
// Update Password
router.put("/updatePassword", getUserMiddleware, updatePasswordController);
// Reset Passord
router.put("/resetPassword", getUserMiddleware, resetPasswordController);
// );
// Delete User By ID
router.delete("/deleteUser/:id", getUserMiddleware, deleteUserController);
module.exports = router;
