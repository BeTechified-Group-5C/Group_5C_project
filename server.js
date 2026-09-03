require("dotenv").config();
const express = require("express");

const getAll = require("./routes/get_all");
//imports GET route to list all products

const getSingle = require("./routes/get_single");
//imports GET route to list a single product

const postProduct = require("./routes/post");
//imports POST route to add new product

const patchProduct = require("./routes/patch");
//imports PATCH route to edit existing product

const deleteProduct = require("./routes/delete");
//imports DELETE route to delete a product

const errorHandler = require("./middleware/error_handler");
//imports middleware for handling errors

const inventory = require("./routes/data/inventory");
//imports inventory data to be used in API

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', getAll);
//add the GET route for listing all products

app.use('/', getSingle);
//adds the GET route for listing a single prooduct

app.use('/', postProduct);
//adds POST route

app.use('/', patchProduct);
//adds PATCH route

app.use('/', deleteProduct);
//adds delete route

// Error handler must be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});