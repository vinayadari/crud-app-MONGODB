import express from "express";
import {getProducts,getProduct,getProductByName,updateProduct,deleteProduct,createProduct,} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);

router.get("/id/:id", getProduct);

router.get("/name/:product", getProductByName);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

router.post("/", createProduct);

export default router;
