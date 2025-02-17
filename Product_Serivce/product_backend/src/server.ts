import { Request, response, Response } from "express";

const express = require('express');

const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const cors = require("cors")


const { errorHandler } = require("./Controllers/e_CommerceController");
import {router as e_commerceRouter} from "./Routes/product_Routes";

const path = require("path");

const app = express();

require("dotenv").config();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: "*",
        credentials: true,
    })
); 

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log("MongoDB connected"))
    .catch((err:unknown) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected successfully");
});

app.get("/", (_:Request, res:Response) => {
    res.send("Server is working");
});

app.use("/", e_commerceRouter);

app.use("/uploads", express.static(path.join(__dirname,"..","uploads")));



app.use(errorHandler);

app.listen(process.env.PORT || 3322, () => {
    console.log("Server is running on port 3322");
});



Cashfree.XClientId = "TEST10385036e2be6a1b7a431ec0203263058301";
Cashfree.XClientSecret = "cfsk_ma_test_345db7892a73e45121419c01aadb577e_51dad5bf"
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}


app.get('/payment/:amt', async (req:Request, res:Response) => {

    try {
        const amount = Number(req.params["amt"]);
        let request = {
            "order_amount": amount,
            "order_currency": "INR",
            "order_id": generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }
        console.log(request);


        Cashfree.PGCreateOrder("2023-08-01", request).then((response:any) => {
            res.json(response?.data);
        }).catch((error:any) => {
            console.error(error?.response?.data?.message);
        })
    } catch (error) {
        console.log(error);
    }
})


app.post('/verify', async (req:Request, res:Response) => {
    try {
        const { orderId } = req.body;
        console.log(orderId);

        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response:any) => {
            res.json(response?.data);
        }).catch((error:any) => {
            console.error("Erroe -->", error?.response?.data?.message);
        })
    } catch (error) {
        console.log("Erroe ->>", error);
    }
})