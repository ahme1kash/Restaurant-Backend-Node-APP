const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    // validation

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }
    const newDish = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newDish.save();
    res.status(201).send({
      success: true,
      message: "Food Created Successfully",
      newDish,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal Server Error, Problem with Create Food API",
      success: false,
    });
  }
};
const getAllFoodController = async (req, res) => {
  try {
    const dishes = await foodModel.find();
    // validation
    if (!dishes) {
      return res.status(404).send({
        success: false,
        message: "Dishes not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Dishes retrieved successfully",
      "total Dishes": dishes.length,
      dishes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get All Food Controller API,Internal Server Error",
      totalDishes: dishes.length,
    });
  }
};
const getSingleFoodController = async (req, res) => {
  try {
    const dish = await foodModel.findById(req.params.id);
    if (!dish) {
      return res.status(404).send({
        success: false,
        message: "Dish Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Dish Information fetched Successfully",
      dish,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Single Food Controller API,Internal Server Error",
    });
  }
};
const updateFoodController = async (req, res) => {
  try {
    const dish = await foodModel.findById(req.params.id);
    // validation
    if (!dish) {
      return res.status(404).send({
        success: false,
        message: "Dish Not Found",
      });
    }
    const editedDish = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      foodTags: req.body.foodTags,
      category: req.body.category,
      code: req.body.code,
      isAvailable: req.body.isAvailable,
      restaurant: req.body.restaurant,
      rating: req.body.rating,
      ratingCount: req.body.ratingCount,
    };
    const updatedDishFields = { ...dish._doc, ...editedDish };
    await foodModel.findByIdAndUpdate(
      req.params.id,
      updatedDishFields,
      { new: true } // This is important to add.
    );
    res.status(200).send({
      success: true,
      message: "Dish Updated Successfully",
      updatedDishFields,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Update Food Api",
    });
  }
};
const deleteSingleFoodController = async (req, res) => {
  try {
    const dish = await foodModel.findById(req.params.id);
    if (!dish) {
      return res.status(404).send({
        success: true,
        message: "Dish Not Found!! The dish might have been deleted before",
      });
    }
    await foodModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: "True",
      message: "Dish is deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete Single Food API",
    });
  }
};
const getFoodByResturantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant_dishes = await foodModel.find({
      restaurant: restaurantId,
    });
    // validation
    if (!restaurant_dishes) {
      return res.status(404).send({
        success: false,
        message: "Currently No dishes are being served at Restaurant",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Dishes from the Restaurant are retrieved successfully",
      "total Dishes From Restaurant": restaurant_dishes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Food By Resturant API",
    });
  }
};
const placeOrderController = async (req, res) => {
  try {
    const total = 0;
    const { cart, payment } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Add Cart and Payment Method",
      });
    }
    cart.map((food) => (total += food.price));
    const newOrder = orderModel({
      dishes: cart,
      payment: total,
      buyer: req.body,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      err,
    });
  }
};
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Invalid Order ID",
      });
    }
    const { status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updateFoodController,
  deleteSingleFoodController,
  getFoodByResturantController,
  placeOrderController,
  orderStatusController,
};
