const express = require ("express");
const router = express.Router();
const inventory = require("./data/inventory");

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const product = inventory.find((t) => t.id === parseInt(id));
    if(!product) return res.status(404).json({error: "Not found"});
    res.status(200).json(product);
});
//creates GET single route to be imported to server.js

module.exports = router;
