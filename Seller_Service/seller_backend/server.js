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


app.get('/payment/:amt', async (req, res) => {

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


        Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
            res.json(response.data);
        }).catch(error => {
            console.error(error.response.data.message);
        })
    } catch (error) {
        console.log(error);
    }
})


app.post('/verify', async (req, res) => {
    try {
        const { orderId } = req.body;
        console.log(orderId);

        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            res.json(response.data);
        }).catch(error => {
            console.error("Erroe -->", error.response.data.message);
        })
    } catch (error) {
        console.log("Erroe ->>", error);
    }
})