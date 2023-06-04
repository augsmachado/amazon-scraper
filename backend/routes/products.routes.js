import express from "express";
import ProductsCtrl from "../controllers/products.controllers.js";

const router = express.Router();

router.route("/").get(ProductsCtrl.getProducts);
router.route("/:product_id").get(ProductsCtrl.getProductById);
router.route("/:product_id/reviews").get(ProductsCtrl.getReviewsByProductId);
router
	.route("/:product_id/offers")
	.get(ProductsCtrl.getProductOffersByProductId);

export default router;
