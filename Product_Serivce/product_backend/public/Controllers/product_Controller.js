"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByType = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.addProducts = exports.errorHandler = void 0;
const product_Services_1 = require("../Services/product_Services");
const jwt = require('jsonwebtoken');
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
exports.errorHandler = errorHandler;
const addProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostPath = `${req.protocol}://${req.get("host")}/uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        const productData = req.body;
        productData['p_id'] = Math.floor(Math.random() * 10000);
        yield (0, product_Services_1.createProduct)(hostPath, req.body);
        res.header("Access-Control-Allow-Origin: *");
        res.status(201).json({
            success: true,
            message: "Product added successfully!",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addProducts = addProducts;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const p_id = Number(req.params["p_id"]);
        yield (0, product_Services_1.updateProductDetails)(p_id, inputData);
        res.status(200).json({
            success: true,
            msg: "Product updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_id = Number(req.params["p_id"]);
        yield (0, product_Services_1.deleteProductDetails)(p_id);
        res.status(200).json({
            success: true,
            msg: "product removed successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_id = Number(req.params["p_id"]);
        const product = yield (0, product_Services_1.getProductByIdDetails)(p_id);
        // product["p_image"]=product.p_image.replace('localhost:3322', 'ksvbk2mz-3322.inc1.devtunnels.ms')
        res.status(200).json({
            success: true,
            msg: "Product fetched successfully",
            product
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const getProductByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_type = req.params["p_type"];
        const products = yield (0, product_Services_1.getProductByTypeDetails)(p_type);
        // const products:Array<DBInterfaces.ProductWarehouse>=productss.filter((a:DBInterfaces.ProductWarehouse) => {
        //   a["p_image"]=a.p_image.replace('localhost:3322', 'ksvbk2mz-3322.inc1.devtunnels.ms')
        //   return a;
        // })
        res.status(200).json({
            success: true,
            msg: "Products fetched successfully",
            products
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductByType = getProductByType;
module.exports = {
    errorHandler: exports.errorHandler,
    addProducts: exports.addProducts,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct,
    getProductById: exports.getProductById,
    getProductByType: exports.getProductByType
};
