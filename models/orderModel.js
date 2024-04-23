const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["order received", "preparing order", "on the way", "deliverd"],
      default: "order received",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Order", orderSchema);
