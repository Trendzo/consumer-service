class AddToCart {
  constructor(repo) {
    this.repo = repo;
  }
  async execute({ userId, productId, quantity }) {
    const existing = await this.repo.find(userId, productId);
    if (existing) {
      existing.quantity += quantity;
      return this.repo.update(existing._id, { quantity: existing.quantity });
    }
    return this.repo.create({ userId, productId, quantity });
  }
}
module.exports = AddToCart;
