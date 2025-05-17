class AddToWishlist {
  constructor(repo) {
    this.repo = repo;
  }
  async execute({ userId, productId }) {
    return this.repo.add(userId, productId);
  }
}
module.exports = AddToWishlist;
