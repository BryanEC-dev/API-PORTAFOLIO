const { logger } = require("../log");
const { error } = require("../response/error");


const response = require

function logErrors(err, req, res,next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next){
    if(req.xhr) {
        logger.error(err)
        error(req, res,`Ha ocurrido un error intente mas tarde ${err.message}`,500)
    }
    next(err)
}

function errorHandler(err, req, res, next) {
        next(err);
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler,
}