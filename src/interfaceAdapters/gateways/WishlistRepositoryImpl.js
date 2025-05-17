const Wishlist = require("../../domain/entities/Wishlist.js");
class WishlistRepositoryImpl {
  async add(userId, productId) {
    return Wishlist.create({ userId, productId });
  }
  async getUserWishlist(userId) {
    return Wishlist.find({ userId }).populate("productId");
  }
  // implement updateWishlist
  async updateWishlist(userId, updatedWishlist) {
    return Wishlist.updateOne({ userId }, { $set: { wishlist: updatedWishlist } });
  }
  async remove(userId, productId) {
    return Wishlist.deleteOne({ userId, productId });
  }
  async clearWishlist(userId) {
    return Wishlist.deleteMany({ userId });}
}
module.exports = WishlistRepositoryImpl;
