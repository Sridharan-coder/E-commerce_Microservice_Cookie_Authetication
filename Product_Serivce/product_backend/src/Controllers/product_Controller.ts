

import {
  createProduct,
  updateProductDetails,
  deleteProductDetails,
  getProductByIdDetails,
  getProductByTypeDetails
} from "../Services/product_Services";
import { Request, Response } from "express";
import { CustomError, DBInterfaces } from "../fileInterfaces";
const jwt = require('jsonwebtoken');

export const errorHandler = async (err: CustomError.Error, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export const addProducts = async (req: Request | any, res: Response, next: Function) => {
  try {
    const hostPath = `${req.protocol}://${req.get("host")}/uploads/${req?.file?.filename}`
    const productData = req.body
    productData['p_id'] = Math.floor(Math.random() * 10000);

    await createProduct(hostPath, req.body);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      success: true,
      message: "Product added successfully!",
    });
  } catch (error) {
    next(error);
  }
}

export const updateProduct = async (req: Request, res: Response, next: Function) => {
  try {
    const inputData = req.body;
    const p_id = Number(req.params["p_id"]);

    await updateProductDetails(p_id, inputData);
    res.status(200).json({
      success: true,
      msg: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: Request, res: Response, next: Function) => {
  try {
    const p_id = Number(req.params["p_id"]);

    await deleteProductDetails(p_id);
    res.status(200).json({
      success: true,
      msg: "product removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req: Request, res: Response, next: Function) => {
  try {
    const p_id = Number(req.params["p_id"]);

    const product = await getProductByIdDetails(p_id);
    // product["p_image"]=product.p_image.replace('localhost:3322', 'ksvbk2mz-3322.inc1.devtunnels.ms')
    res.status(200).json({
      success: true,
      msg: "Product fetched successfully",
      product
    });
  } catch (error) {
    next(error);
  }
}

export const getProductByType = async (req: Request, res: Response, next: Function) => {

  try {
    const p_type: string = req.params["p_type"];
    const products: Array<DBInterfaces.ProductWarehouse> = await getProductByTypeDetails(p_type);

    // const products:Array<DBInterfaces.ProductWarehouse>=productss.filter((a:DBInterfaces.ProductWarehouse) => {
    //   a["p_image"]=a.p_image.replace('localhost:3322', 'ksvbk2mz-3322.inc1.devtunnels.ms')
    //   return a;
      
    // })
    res.status(200).json({
      success: true,
      msg: "Products fetched successfully",
      products
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  errorHandler,
  addProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByType
}