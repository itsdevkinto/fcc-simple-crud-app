import { Router } from "express";
import { getProducts, getProduct, updateProduct, deleteProduct, createProduct } from "../controllers/product.controller.js";

const router = Router();

// Notice we use "/" instead of "/api/products"
router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/" , createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
