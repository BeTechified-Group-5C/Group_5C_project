const express = require('express');
const router = express.Router();
const inventory = require('./data/inventory');

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = inventory.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    inventory.splice(index, 1);
    res.json({ message: 'Item deleted successfully' });
    res.status(200).send();
});

module.exports = router;