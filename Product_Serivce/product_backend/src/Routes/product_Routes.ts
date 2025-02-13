
import express from "express";
import { addProducts,
    updateProduct,
    deleteProduct, 
    getProductById, 
    getProductByType
} from "../Controllers/product_Controller";

import {upload} from "../utils/upload";

export const router=express.Router()

router.get("/product/getProductById/:p_id",getProductById)
router.get("/product/getProductByType/:p_type",getProductByType)

router.post("/product/addProduct",upload,addProducts)

router.put("/product/updateProduct/:p_id",updateProduct)

router.delete("/product/deleteProduct/:p_id",deleteProduct)

module.exports={router};


