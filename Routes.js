const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: Math.round(product.price*100)
        },
        quantity: product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://teekay-stores.vercel.app/paymentSuccess",
        cancel_url:"https://teekay-stores.vercel.app/paymentFailure",
    })

    res.json({id:session.id})
})

module.exports = router;