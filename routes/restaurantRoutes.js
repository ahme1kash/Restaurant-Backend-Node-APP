const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  updateRestaurantByIdController,
  deleteRestaurantByIdController,
  deleteAllRestaurantController,
} = require("../controllers/restaurantControllers");
const getUserMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
// Get User
router.post("/create", getUserMiddleware, createRestaurantController);

router.get("/getAllRestaurants", getUserMiddleware, getAllRestaurantController);
router.get(
  "/getRestaurnatById/:id",
  getUserMiddleware,
  getRestaurantByIdController
);
router.put(
  "/updateRestaurnatById/:id",
  getUserMiddleware,
  updateRestaurantByIdController
);
router.delete(
  "/deleteRestaurantById/:id",
  getUserMiddleware,
  deleteRestaurantByIdController
);
router.delete(
  "/deleteAllRestaurant",
  getUserMiddleware,
  deleteAllRestaurantController
);
module.exports = router;
