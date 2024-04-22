const restaurantModel = require("../models/restaurantModel");
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: "false",
        message: "Please Provide Title and Address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "New restaurant created successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Restaurant API",
    });
  }
};
// Get All Restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    // validation
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "Restaurants Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All Restaurants fetched Successfully",
      count: Object.keys(restaurants).length,
      restaurants,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in API,Internal Server Error",
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Restaurant Information fetched Successfully",
      restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in API,Internal Server Error",
    });
  }
};
const updateRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    // validation
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    const editedRestaurant = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      foods: req.body.foods,
      foods: req.body.foods,
      time: req.body.time,
      pickup: req.body.pickup,
      delivery: req.body.delivery,
      isOpen: req.body.isOpen,
      logoUrl: req.body.logoUrl,
      rating: req.body.rating,
      coords: req.body.coordscoords,
    };
    const updatedRestaurantFields = { ...restaurant._doc, ...editedRestaurant };
    await restaurantModel.findByIdAndUpdate(
      req.params.id,
      updatedRestaurantFields,
      { new: true } // This is important to add.
    );
    res.status(200).send({
      success: true,
      message: "Restaurant Updated Successfully",
      updatedRestaurantFields,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Update Restaurant Api",
    });
  }
};
const deleteRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: true,
        message: "Restaurant Not Found!!",
      });
    }
    await restaurantModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: "True",
      message: "Restaurant is deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Restaurant Delete API",
    });
  }
};
const deleteAllRestaurantController = async (req, res) => {
  try {
    await restaurantModel.deleteMany();
    return res.status(200).send({
      success: "True",
      message: "All Restaurant are deleted successfully!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in All Restaurant Delete API",
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  updateRestaurantByIdController,
  deleteRestaurantByIdController,
  deleteAllRestaurantController,
};
