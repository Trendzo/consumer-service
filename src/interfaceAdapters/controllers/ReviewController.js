const express = require("express");
const ReviewRepo = require("../gateways/ReviewRepositoryImpl.js");
const SubmitReview = require("../../application/useCases/SubmitReview.js");
const reviewRouter = express.Router();
const reviewRepo = new ReviewRepo();

reviewRouter.post("/", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  try {
    const existingReviews = await reviewRepo.getUserReviews(userId);
    const alreadyExists = existingReviews.some(
      (item) => item.productId._id.toString() === req.body.productId
    );

    // console.log(
    //   "> existingReviews",
    //   existingReviews,
    //   "alreadyExists",
    //   alreadyExists
    // );

    if (alreadyExists) {
      return res
        .status(400)
        .json({ error: "Review already exists for this product by this user" });
    }

    const uc = new SubmitReview(reviewRepo);
    const review = await uc.execute({
      userId: req.body.userId,
      productId: req.body.productId,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

reviewRouter.get("/:productId", async (req, res) => {
  try {
    const reviews = await reviewRepo.getByProduct(req.params.productId);
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = reviewRouter;
