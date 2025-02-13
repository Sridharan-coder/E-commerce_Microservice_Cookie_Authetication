const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerInfo = new Schema({
    s_id: {
        type: Number,
        required: true,
        unique: true
    },
    s_name: {
        type: String,
        required: true,
    },
    s_phoneNumber: {
        type: Number,
        required: true,
    },
    s_emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    s_password: {
        type: String,
        required: true
    }
})

const Seller = mongoose.model("Seller", sellerInfo)

module.exports = { Seller}