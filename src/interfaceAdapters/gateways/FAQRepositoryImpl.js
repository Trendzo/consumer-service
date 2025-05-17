const FAQ = require("../../domain/entities/FAQ.js");
class FAQRepositoryImpl {
  async create(data) {
    return FAQ.create(data);
  }
  async getByProduct(productId) {
    return FAQ.find({ productId });
  }
}
module.exports = FAQRepositoryImpl;
