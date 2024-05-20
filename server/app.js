const express = require("express")
const app = express();
const mongoose = require("mongoose")
require("./db/conn");
const users = require("./model/userSchema")
const cors = require("cors")
require('dotenv').config();
require('dotenv').config();
require("dotenv").config()

const PORT = process.env.PORT;
const router = require("./router/router")
const cookieParser = require("cookie-parser")
const authenticate = require("./middleware/authenticat")

const stripe = require("stripe")("sk_test_51OU1hESJ3xUqIdYsTNBhdYYOqN5KXFyhH9FzzQc7YTe81RfmOMOtLKhMJKX8h8gRTF37CWQjgug9uDyzSzs60NZY00LPU31Ugb")

app.use(cors());
app.use(cookieParser(""))
app.use(express.json());
app.use(router);

// Payment Checkout
app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body
    // console.log(products)
    const line_Items = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name,

            },
            unit_amount: product.price * 100,
        },
        quantity: product.qunty
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_Items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancle"
    });
    res.json({ id: session.id })
})


app.listen(PORT, () => {
    console.log("server is start on Port 8005")
})



