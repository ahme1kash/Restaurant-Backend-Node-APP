const testController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      messsage: "test User Data API",
    });
  } catch (err) {
    console.log("Error Occured\n", err);
  }
};
module.exports = { testController };
