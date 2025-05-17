const express = require("express");
const WishlistRepo = require("../gateways/WishlistRepositoryImpl.js");
const AddToWishlist = require("../../application/useCases/AddToWishlist.js");
const RemoveFromWishlist = require("../../application/useCases/RemoveFromWishlist.js");
// TODO remove whishlist do
const router = express.Router();
const repo = new WishlistRepo();

router.post("/add", async (req, res) => {
  try {
    const existingItems = await repo.getUserWishlist("user1");
    const alreadyExists = existingItems.some(
      (item) => item.productId._id.toString() === req.body.productId
    );

    // console.log(
    //   "> existingItems",
    //   existingItems,
    //   "alreadyExists",
    //   alreadyExists
    // );

    if (alreadyExists) {
      return res
        .status(400)
        .json({ error: "Product already exists in the wishlist" });
    }

    const uc = new AddToWishlist(repo);
    const item = await uc.execute({
      userId: "user1",
      productId: req.body.productId,
    });

    res.status(201).json(item);
    // const uc = new AddToWishlist(repo);
    // const item = await uc.execute({
    //   userId: "user1",
    //   productId: req.body.productId,
    // });
    // res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const items = await repo.getUserWishlist(id);
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implement remove from wishlist
router.delete("/remove", async (req, res) => {
  console.log("> req.body", req.body);
  try {
    const uc = new RemoveFromWishlist(repo);
    const item = await uc.execute({
      userId: "user1",
      productId: req.body.productId,
    });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// implement clear wishlist
router.delete("/clear", async (req, res) => {
  try {
    const uc = new ClearWishlist(repo);
    await uc.execute({
      userId: "user1",
    });
    res.status(200).json({ message: "Wishlist cleared" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
