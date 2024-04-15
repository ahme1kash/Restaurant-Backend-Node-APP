const mongoose = require("mongoose");
const colors = require("colors");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    return `Connection established successfully with database ${mongoose.connection.name} at port ${mongoose.connection.port}`
      .blue;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connect;
