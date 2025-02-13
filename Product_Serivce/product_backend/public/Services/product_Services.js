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
exports.getProductByTypeDetails = exports.getProductByIdDetails = exports.deleteProductDetails = exports.updateProductDetails = exports.createProduct = void 0;
const { Warehouse } = require("../Models/schema");
const createProduct = (filePath, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.create(Object.assign(Object.assign({}, content), { p_image: filePath }));
});
exports.createProduct = createProduct;
const updateProductDetails = (p_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOneAndUpdate({ p_id }, content, {
        new: true,
    });
});
exports.updateProductDetails = updateProductDetails;
const deleteProductDetails = (p_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOneAndDelete({ p_id });
});
exports.deleteProductDetails = deleteProductDetails;
const getProductByIdDetails = (p_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOne({ p_id });
});
exports.getProductByIdDetails = getProductByIdDetails;
const getProductByTypeDetails = (p_type) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.find({
        p_type: {
            $regex: `.*${p_type}.*`,
            $options: 'i'
        }
    });
});
exports.getProductByTypeDetails = getProductByTypeDetails;
module.exports = {
    createProduct: exports.createProduct,
    updateProductDetails: exports.updateProductDetails,
    deleteProductDetails: exports.deleteProductDetails,
    getProductByIdDetails: exports.getProductByIdDetails,
    getProductByTypeDetails: exports.getProductByTypeDetails
};
