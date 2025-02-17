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
const express = require('express');
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./Controllers/e_CommerceController");
const product_Routes_1 = require("./Routes/product_Routes");
const path = require("path");
const app = express();
require("dotenv").config();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
    credentials: true,
}));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected successfully");
});
app.get("/", (_, res) => {
    res.send("Server is working");
});
app.use("/", product_Routes_1.router);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);
app.listen(process.env.PORT || 3322, () => {
    console.log("Server is running on port 3322");
});
Cashfree.XClientId = "TEST10385036e2be6a1b7a431ec0203263058301";
Cashfree.XClientSecret = "cfsk_ma_test_345db7892a73e45121419c01aadb577e_51dad5bf";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);
    const orderId = hash.digest('hex');
    return orderId.substr(0, 12);
}
app.get('/payment/:amt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        };
        console.log(request);
        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
            res.json(response === null || response === void 0 ? void 0 : response.data);
        }).catch((error) => {
            var _a, _b;
            console.error((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        });
    }
    catch (error) {
        console.log(error);
    }
}));
app.post('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.body;
        console.log(orderId);
        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            res.json(response === null || response === void 0 ? void 0 : response.data);
        }).catch((error) => {
            var _a, _b;
            console.error("Erroe -->", (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message);
        });
    }
    catch (error) {
        console.log("Erroe ->>", error);
    }
}));
