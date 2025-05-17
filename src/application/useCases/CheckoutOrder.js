class CheckoutOrder {
  constructor(repo) {
    this.repo = repo;
  }
  async execute({ userId }) {
    const cartItems = await this.repo.getCart(userId);
    // Simulate checkout logic here
    await this.repo.clearCart(userId);
    return { success: true, items: cartItems };
  }
}
module.exports = CheckoutOrder;
