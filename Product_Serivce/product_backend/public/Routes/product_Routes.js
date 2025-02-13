"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_Controller_1 = require("../Controllers/product_Controller");
const upload_1 = require("../utils/upload");
exports.router = express_1.default.Router();
exports.router.get("/product/getProductById/:p_id", product_Controller_1.getProductById);
exports.router.get("/product/getProductByType/:p_type", product_Controller_1.getProductByType);
exports.router.post("/product/addProduct", upload_1.upload, product_Controller_1.addProducts);
exports.router.put("/product/updateProduct/:p_id", product_Controller_1.updateProduct);
exports.router.delete("/product/deleteProduct/:p_id", product_Controller_1.deleteProduct);
module.exports = { router: exports.router };
