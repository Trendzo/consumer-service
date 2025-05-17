const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("FAQ", FAQSchema);
