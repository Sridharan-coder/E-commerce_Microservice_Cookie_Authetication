"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
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
