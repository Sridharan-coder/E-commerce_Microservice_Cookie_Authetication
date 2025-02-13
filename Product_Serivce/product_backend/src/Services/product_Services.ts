import { DBInterfaces } from "../fileInterfaces";


const { Warehouse} = require("../Models/schema")

export const createProduct = async (filePath:string, content:DBInterfaces.ProductWarehouse) => {
    return await Warehouse.create({ ...content, p_image: filePath })
}

export const updateProductDetails = async (p_id:number, content:DBInterfaces.ProductWarehouse) => {
    return await Warehouse.findOneAndUpdate({ p_id }, content, {
        new: true,
    });
}

export const deleteProductDetails = async (p_id:number) => {
    return await Warehouse.findOneAndDelete({ p_id });
}

export const getProductByIdDetails = async (p_id:number) => {
    return await Warehouse.findOne({ p_id })
}

export const getProductByTypeDetails = async (p_type:string) => {
    return await Warehouse.find({
        p_type: {
            $regex: `.*${p_type}.*`,
            $options: 'i'
        }
    })
}

module.exports = {
    createProduct,
    updateProductDetails,
    deleteProductDetails,
    getProductByIdDetails,
    getProductByTypeDetails
}