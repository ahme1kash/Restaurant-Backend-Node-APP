const categoryModel = require("../models/categoryModel");
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Invalid Request",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "category Created Successfully",
      newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Internal Server Error, Error in categoryController API",
    });
  }
};
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    // validation
    if (!categories) {
      return res.status(200).send({
        success: false,
        messahe: "Restaurants not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Categories retrieved successfully",
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in API,Internal Server Error",
    });
  }
};
const updateCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    const editedCategory = {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
    };
    const updatedCategoryFields = { ...category._doc, ...editedCategory };
    await categoryModel.findByIdAndUpdate(
      req.params.id,
      updatedCategoryFields,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated Successfully",
      updatedCategoryFields,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in update category API",
    });
  }
};
const deletCategoryControllerById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    // validation
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    await categoryModel.findByIdAndDelete(req.params.id);
    return res.status(500).send({
      success: true,
      message: "Category is deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Category Delete API,Internal Server Error",
    });
  }
};
const deletAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(404).send({
        success: "False",
        message: "No Categories Data in collection!",
      });
    }
    await categoryModel.deleteMany();
    return res.status(200).send({
      success: "True",
      message: "All Categories are deleted successfully!!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in All Categories Delete API",
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deletCategoryControllerById,
  deletAllCategoryController,
};
