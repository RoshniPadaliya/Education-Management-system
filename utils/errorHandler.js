const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
};

module.exports = errorHandler;
