import express from "express";
import ProductsCtrl from "../controllers/products.controllers.js";

const router = express.Router();

router.route("/:product_id").get(ProductsCtrl.getProductById);

export default router;
