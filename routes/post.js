const express = require('express');
const router = express.Router();
let inventory = require('./data/inventory');

router.post('/', (req, res) => {
    const { name, category, quantity, price, inStock } = req.body;

    if (!name || !category || quantity === undefined || price === undefined) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    const newItem = {
        id: inventory.length + 1,
        name: name,
        category: category,
        quantity: quantity,
        price: price,
        inStock: inStock
    };

    inventory.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;