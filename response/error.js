exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: true,
        status: statusCode,
        error: statusMessage,
    });
}
