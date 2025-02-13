"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const warehouseInfo = new Schema({
    p_id: {
        type: Number,
        required: true,
        unique: true
    },
    p_name: {
        type: String,
        required: true,
    },
    p_price: {
        type: Number,
        required: true,
    },
    p_image: {
        type: String,
        required: true
    },
    p_type: {
        type: String,
        required: true
    },
    p_stock: {
        type: Number,
        required: true,
    },
    s_ids: [{
            type: Number,
            required: true,
        }]
});
const Warehouse = mongoose_1.default.model("Warehouse", warehouseInfo);
module.exports = { Warehouse };
