const Review = require("../../domain/entities/Review.js");
class ReviewRepositoryImpl {
  async create(data) {
    return Review.create(data);
  }
  async getByProduct(productId) {
    return Review.find({ productId });
  }

  async getUserReviews(userId) {
    return Review.find({ userId }).populate("productId");
  }
}
module.exports = ReviewRepositoryImpl;
