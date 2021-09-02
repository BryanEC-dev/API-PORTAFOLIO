exports.success = function (req, res, body, status, message) {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: body,
        message: message,
    });
}
