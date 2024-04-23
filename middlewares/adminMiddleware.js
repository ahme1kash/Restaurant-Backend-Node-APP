const userModel = require("../models/userModel");
const getAdminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.id);
    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      messgae: "Unauthorized Access",
      err,
    });
  }
};
module.exports = getUserMiddleware;
