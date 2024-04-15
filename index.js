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
app.listen(port, async (req, res) => {
  if (await connect()) {
    console.log(await connect());
    console.log(`Server Up and Running at port ${port}`.yellow.bold.italic);
  }
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1 style='color:red'> Hello, Welcome to Restaurant Server</h1>");
});