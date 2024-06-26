const JWT = require("jsonwebtoken");
const { tokenBlacklist } = require("../controllers/authControllers");
const getUserMiddleware = (req, res, next) => {
  try {
    // get token
    const token = req.headers["authorization"].split(" ")[1];
    // console.log(req.headers);
    if (tokenBlacklist.includes(token)) {
      return res.status(200).send({
        success: false,
        message:
          "User is Logged out, Try LogIn again to perform User Operations",
      });
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorized User",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      messgae: "Please provide Auth Token",
      err,
    });
  }
};
module.exports = getUserMiddleware;
