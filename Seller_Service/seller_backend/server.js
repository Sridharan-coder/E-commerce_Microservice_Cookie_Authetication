const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
const cookieParser = require("cookie-parser");




const { errorHandler } = require("./Controllers/seller_Controller");
const e_commerceRouter = require("./Routes/seller_Routes")

const app = express();

require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

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

app.use("/", e_commerceRouter);


app.use(errorHandler);

app.listen(process.env.PORT || 3323, () => {
    console.log("Server is running on port 3323");
});
