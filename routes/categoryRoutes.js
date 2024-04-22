const express = require("express");
const getUserMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deletCategoryControllerById,
  deletAllCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();
// routes

//* Create Category
router.post("/create", getUserMiddleware, createCategoryController);
router.get("/getAll", getUserMiddleware, getAllCategoryController);
router.put("/update/:id", getUserMiddleware, updateCategoryController);
router.delete("/delete/:id", getUserMiddleware, deletCategoryControllerById);
router.delete("/deleteAll", getUserMiddleware, deletAllCategoryController);
module.exports = router;
