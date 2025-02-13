"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const e_CommerceController_1 = require("../Controllers/e_CommerceController");
const upload_1 = require("../utils/upload");
exports.router = express_1.default.Router();
exports.router.get("/product/getProductById/:p_id", e_CommerceController_1.getProductById);
exports.router.get("/product/getProductByType/:p_type", e_CommerceController_1.getProductByType);
exports.router.post("/product/addProduct", upload_1.upload, e_CommerceController_1.addProducts);
exports.router.put("/product/updateProduct/:p_id", e_CommerceController_1.updateProduct);
exports.router.delete("/product/deleteProduct/:p_id", e_CommerceController_1.deleteProduct);
module.exports = { router: exports.router };
