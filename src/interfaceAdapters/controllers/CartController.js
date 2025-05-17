const express = require("express");
const CartRepo = require("../gateways/CartRepositoryImpl.js");
const AddToCart = require("../../application/useCases/AddToCart.js");
const RemoveFromCart = require("../../application/useCases/RemoveFromCart.js");
const CheckoutOrder = require("../../application/useCases/CheckoutOrder.js");
const router = express.Router();
const repo = new CartRepo();

router.post("/add", async (req, res) => {
  try {
    const uc = new AddToCart(repo);
    const item = await uc.execute({
      userId: "user1",
      productId: req.body.productId,
      quantity: req.body.quantity || 1,
    });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const items = await repo.getCart(userId);
    console.log("> cart items", items);
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implement remove from cart using the use case RemoveFromCart
router.delete("/remove", async (req, res) => {
  try {
    const uc = new RemoveFromCart(repo);
    const item = await uc.execute({
      userId: "user1",
      productId: req.body.productId,
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implement clear item from cart using CartRepositoryImpl
router.delete("/clear", async (req, res) => {
  try {
    const items = await repo.clearCart("user1");
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implement update item quantity in cart using CartRepositoryImpl
router.put("/update", async (req, res) => {
  try {
    const item = await repo.update(req.body.id, {
      quantity: req.body.quantity,
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const uc = new CheckoutOrder(repo);
    const result = await uc.execute({ userId: "user1" });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
