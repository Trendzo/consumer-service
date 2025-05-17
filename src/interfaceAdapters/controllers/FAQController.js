const express = require("express");
const FAQRepo = require("../gateways/FAQRepositoryImpl.js");
const faqRouter = express.Router();
const faqRepo = new FAQRepo();

faqRouter.get("/:productId", async (req, res) => {
  try {
    const faqs = await faqRepo.getByProduct(req.params.productId);
    res.json(faqs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implementation of the create FAQ endpoint
faqRouter.post("/", async (req, res) => {
  try {
    const { productId, question, answer } = req.body;
    if (!productId || !question) {
      return res.status(400).json({ error: "Product ID and question are required" });
    }
    const faq = await faqRepo.create({ productId, question, answer });
    res.status(201).json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = faqRouter;
