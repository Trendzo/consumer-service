class RemoveFromWishlist {
  constructor(wishlistRepository) {
    this.wishlistRepository = wishlistRepository;
  }

  async execute({ userId, productId }) {
    console.log("> userId", userId, "productId", productId);
    if (!userId || !productId) {
      throw new Error("User ID and Product ID are required");
    }

    const wishlist = await this.wishlistRepository.getUserWishlist(userId);
    if (!wishlist) {
      throw new Error("Wishlist not found for the user");
    }

    const updatedWishlist = wishlist.filter(
      (item) => item.productId !== productId
    );

    await this.wishlistRepository.updateWishlist(userId, updatedWishlist);

    return { success: true, message: "Product removed from wishlist" };
  }
}

module.exports = RemoveFromWishlist;
