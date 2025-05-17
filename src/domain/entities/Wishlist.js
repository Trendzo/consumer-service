const mongoose = require("mongoose");
const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Hardcoded user ID for now
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Wishlist", WishlistSchema);
