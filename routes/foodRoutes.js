const express = require("express");
const getUserMiddleware = require("../middlewares/authMiddleware");
const getAdminMiddleware = require("../middlewares/adminMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updateFoodController,
  deleteSingleFoodController,
  getFoodByResturantController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const router = express.Router();
// routes

//* Create Category
router.post("/create", getUserMiddleware, createFoodController);
router.get("/getAll", getUserMiddleware, getAllFoodController);
router.get("/get/:id", getUserMiddleware, getSingleFoodController);
router.put("/update/:id", getUserMiddleware, updateFoodController);
router.delete("/delete/:id", getUserMiddleware, deleteSingleFoodController);
router.get(
  "/getFoodByRestaurant/:id",
  getUserMiddleware,
  getFoodByResturantController
);
router.post("/placeorder", getUserMiddleware, placeOrderController);
router.post("/orderStatus/:id", getAdminMiddleware, orderStatusController);
module.exports = router;
