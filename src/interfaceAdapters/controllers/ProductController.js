const express = require("express");
const ProductRepo = require("../gateways/ProductRepositoryImpl.js");
const ListProducts = require("../../application/useCases/ListProducts.js");

const router = express.Router();
const repo = new ProductRepo();

// GET /products?search=
router.get("/", async (req, res) => {
  try {
    const uc = new ListProducts(repo);
    const products = await uc.execute({ search: req.query.search });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
