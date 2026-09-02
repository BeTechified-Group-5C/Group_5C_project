require("dotenv").config();
const express = require("express");
const getAll = require("./routes/get_all");
const getSingle = require("./routes/get_single");
const postProduct = require("./routes/post");
const patchProduct = require("./routes/patch");
const deleteProduct = require("./routes/delete");
const errorHandler = require("./middleware/error_handler");
const inventory = require("./routes/data/inventory");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', getAll);
app.use('/', getSingle);
app.use('/', postProduct);
app.use('/', patchProduct);
app.use('/', deleteProduct);
// Error handler must be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});