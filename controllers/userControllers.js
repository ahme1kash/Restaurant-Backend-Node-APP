// Get USER Info
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const getUserController = async (req, res) => {
  // Below console contains id which comes from middleware "getUserMiddleware" from authMiddleware.js
  //   console.log("USer data after hitting middleware", req.body);
  try {
    const user = await userModel.findById(req.body.id);
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // hide password,_id from server response.
    const { _id, passoword, ...restUser } = user;
    res.status(200).send({
      success: true,
      message: " User Get Successfully",
      user: restUser._doc, //   Hiding password and _id in response but instead of sending restUser its better to send restUser._doc becaz on destructuring mongoose metadata is sent in response.
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get API",
      err,
    });
  }
};

// Update User

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.id);
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const editedUser = {
      phone: req.body.phone,
      userName: req.body.userName,
      address: req.body.address,
    };
    const updatedUserFields = { ...user._doc, ...editedUser };
    await userModel.findByIdAndUpdate(
      req.body.id,
      updatedUserFields,
      { new: true } // This is important to add.
    );
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      editedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Update User Api",
    });
  }
};

// Update User Password
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    // get data from USER
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide both old and new passwords",
      });
    }
    // comparing passord
    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message:
          "Password does not Match with password in the DB. You need to provide correct existing password for your account to change it to new one",
      });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    // Confirming that the new password provided by user is now the actual password in MongoDB collection's document.

    // As the password is stored in hash we can compare the hashed password from MongoDB collection's document with the hash of new password coming in request (Here in req body)

    // However observing change in hash just is enough to be assured that password is changed successfully.
    const newChangedHashedPassword = user.password;
    const newHashedPasswordFromDB = await bcryptjs.hash(newPassword, salt);
    bcryptjs.compare(
      newChangedHashedPassword,
      newHashedPasswordFromDB,
      function (err, result) {
        if (err) {
          return res.status(500).send({
            success: false,
            message: "Error on comparing passwords, Old Password not updated",
          });
        } else {
          res.status(200).send({
            success: true,
            message: "Old Password Replaced with New One Successfully",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Password Update  Api",
    });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields required to reset password ",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found, Invalid Request",
        user,
      });
    }
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Reset Password  Api",
      err,
    });
  }
};
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: "True",
      message: "Your Account is deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in User Delete API",
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
