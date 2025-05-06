const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');  // Import the Order model

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    const { items, totalPrice } = req.body;
    console.log("items", items)
    console.log("price", totalPrice)
    try {
        // Create a new order document
        const newOrder = new Order({
            items: items,
            totalPrice: totalPrice,
        });

        // Save the order to the database
        await newOrder.save();
        res.status(200).json({ message: 'Order placed successfully!', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to place order.' });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();  // Fetch all orders from the database
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders.' });
    }
});

router.delete('/', async (req, res) => {
    try {
        await Order.deleteMany();
        res.status(200).json({ message: 'All orders cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear orders', error });
    }
});

module.exports = router;