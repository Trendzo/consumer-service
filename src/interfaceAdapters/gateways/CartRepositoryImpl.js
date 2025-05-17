const CartItem = require("../../domain/entities/CartItem.js");
class CartRepositoryImpl {
  async find(userId, productId) {
    return CartItem.findOne({ userId, productId });
  }
  async create(data) {
    return CartItem.create(data);
  }
  async update(id, data) {
    return CartItem.findByIdAndUpdate(id, data, { new: true });
  }
  async getCart(userId) {
    return CartItem.find({ userId }).populate("productId");
  }
  async clearCart(userId) {
    return CartItem.deleteMany({ userId });
  }
  // implement remove from cart using the CartItem model with userId and productId
  async removeFromCart(userId, productId) {
    return CartItem.findOneAndDelete({ userId, productId });
  }
}
module.exports = CartRepositoryImpl;
