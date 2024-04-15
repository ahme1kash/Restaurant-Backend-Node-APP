const userModel = require("../models/userModel");
const registerController = async (req, res) => {
  try {
    const { userName, email, address, phone, password } = req.body;
    if (!userName || !email || !address || !phone || !password) {
      return res.status(500).send({
        success: false,
        message: "Some User fields are Missing.",
      });
    }
    //?check user
    const existing = await userModel.findOne({ phone });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Phone is Already Registered",
      });
    }
    //* Create a New User
    const user = await userModel.create({
      userName,
      email,
      address,
      phone,
      password,
    });
    return res.status(201).send({
      success: true,
      message: "New User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      err,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    //^ Login value(s) missing.
    if (!email || !password) {
      return res.status(500).send({
        successs: false,
        message: "Provide Valid Email And Password",
      });
    }

    // checkUSer
    const user = await userModel.findOne({ email });
    //& USER NOT Found
    if (!user || user.password !== password || user.email !== email) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials,User Not Found!",
      });
    }
    //* USER Found Successfully
    else if (user.password == password && user.email == email) {
      return res.status(200).send({
        success: true,
        message: "Login Succcessfully",
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      succcess: false,
      message: "Error in LogIn API",
      error,
    });
  }
};
module.exports = { registerController, loginController };
