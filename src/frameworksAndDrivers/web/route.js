const productRoutes = require("../../interfaceAdapters/controllers/ProductController.js");
const wishlistRoutes = require("../../interfaceAdapters/controllers/WishlistController.js");
const reviewRoutes = require("../../interfaceAdapters/controllers/ReviewController.js");
const faqRoutes = require("../../interfaceAdapters/controllers/FAQController.js");
const cartRoutes = require("../../interfaceAdapters/controllers/CartController.js");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/wishlist", wishlistRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/faqs", faqRoutes);
  app.use("/cart", cartRoutes);
};
