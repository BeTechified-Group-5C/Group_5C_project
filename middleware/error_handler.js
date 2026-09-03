const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong"
  });
};
//creates error handling middleware to be imported to server.js

module.exports = errorHandler;