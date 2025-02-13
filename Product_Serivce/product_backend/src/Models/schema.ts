import mongoose from 'mongoose';
const Schema = mongoose.Schema;


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
})


const Warehouse = mongoose.model("Warehouse", warehouseInfo)

module.exports = {Warehouse}