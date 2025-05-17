class SubmitReview {
  constructor(repo) {
    this.repo = repo;
  }
  async execute({ userId, productId, rating, comment }) {
    return this.repo.create({ userId, productId, rating, comment });
  }
}
module.exports = SubmitReview;
