import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js"; 

import { createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory } from "../controllers/productCategory.js";

const router = express.Router();

// Product routes
router.post("/products", createProduct); 
router.get("/products", getAllProducts);
router.get("/products/category/:categoryId", getProductsByCategory); 
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct); 


router.post("/category", createCategory); 
router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;
