const express = require("express");
const router = express.Router();
const inventory = require("./data/inventory");

router.patch('/:id', (req, res) => {
    const productEdit = inventory.find((t) => t.id === parseInt(req.params.id));
    if(!productEdit)
        return res.status(404).json({error: "Product not found"});
    Object.assign(productEdit, req.body);
    res.status(200).json(productEdit);
});
//creates PATCH route to be imported to server.js

module.exports = router;