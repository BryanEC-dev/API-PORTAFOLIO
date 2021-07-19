exports.error = function (req, res, message, status, error) {
    let statusCode = status || 500;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: true,
        status: statusCode,
        message: statusMessage,
        description: error,
    });
}
