const express = require('express');
const router = express.Router();
const inventory = require('./data/inventory');

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = inventory.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    inventory.splice(index, 1);
    res.status(204).send();
});
//creates DELETE route to be imported to server.js

module.exports = router;