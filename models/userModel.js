const mongoose = require("mongoose");
const validator = require("validator");
//schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is Required"],
      unique: true,
      min: 12,
      //   max: 18,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    userType: {
      type: String,
      default: "client",
      enum: ["client", "admin", "driver", "vendor"],
    },
    profile: {
      type: String,
      default:
        "https://www.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_36332654.htm#fromView=search&page=3&position=0&uuid=3d49835e-f9af-44f0-a2b1-93355e3efd9d",
    },
    answer: {
      type: String,
      lowercase: true,
      required: [true, "Answer is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); //*.model("collection name", schemaName);
