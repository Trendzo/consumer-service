class ListProducts {
  constructor(productRepo) {
    this.productRepo = productRepo;
  }

  async execute({ search }) {
    if (search) return this.productRepo.search(search);
    return this.productRepo.findAll();
  }
}

module.exports = ListProducts;
