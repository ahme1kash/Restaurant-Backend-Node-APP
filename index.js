// const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./config/db");
const port = process.env.PORT || 3001;

const dotenv = require("dotenv");
dotenv.config();

//* Middlewares
app.use(cors());
app.use(express.json()); //? Accessing client's data in JSON format
app.use(morgan("dev")); //? dev tells about the info anout the url being hit and other related infos
//* Routes
// app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.listen(port, async (req, res) => {
  if (await connect()) {
    console.log("Server Status👇\n");
    console.log(await connect());
    console.log(`Server Up and Running at port ${port}`.yellow.bold.italic);
  }
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1 style='color:red'> Hello, Welcome to Restaurant Server</h1>");
});
