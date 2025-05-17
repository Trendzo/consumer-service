const Product = require("../../domain/entities/Product.js");

class ProductRepositoryImpl {
  async findAll() {
    return Product.find();
  }
  async findById(id) {
    return Product.findById(id);
  }
  async create(p) {
    return Product.create(p);
  }
  async update(id, p) {
    return Product.findByIdAndUpdate(id, p, { new: true });
  }
  async search(q) {
    return Product.find({ name: { $regex: q, $options: "i" } });
  }
}

module.exports = ProductRepositoryImpl;
