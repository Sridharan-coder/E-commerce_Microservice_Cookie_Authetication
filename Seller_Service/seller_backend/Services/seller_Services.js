const { Seller} = require("../Models/schema")

const createSeller = async (content) => {
    return await Seller.create(content);
}

const updateSellerDetails = async (s_id, content) => {
    return await Seller.findOneAndUpdate({ s_id }, content, {
        new: true,
    });
}

const deleteSellerDetails = async (s_id) => {
    return await Seller.findOneAndDelete({ s_id });
}

const getSellerDetails = async (s_id) => {
    return await Seller.findOne({ s_id })
}

const getSellerLogin = async (s_emailAddress) => {
    return await Seller.findOne({ s_emailAddress })
}

module.exports = {
    createSeller,
    updateSellerDetails,
    deleteSellerDetails,
    getSellerDetails,
    getSellerLogin
}