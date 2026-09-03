const express = require('express')
const router = express.Router();
const inventory = require('./data/inventory');

router.get('/', (req, res) => {
  res.status(200).json(inventory);
});
//creates GET all route to be imported to server.js

module.exports = router;