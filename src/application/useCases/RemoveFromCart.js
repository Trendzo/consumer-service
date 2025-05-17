// implement RemoveFromCart use case
class RemoveFromCart {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async execute({ userId, productId }) {
    // Validate input
    if (!userId || !productId) {
      throw new Error("Invalid input");
    }

    // Remove item from cart
    const result = await this.cartRepository.removeFromCart(userId, productId);
    return result;
  }
}
module.exports = RemoveFromCart;