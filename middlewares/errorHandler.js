const logger = require('../log')
const { error } = require("../response/error");


function logErrors(err, req, res,next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next){
    console.log('clientErrorHandler');
    logger.info(err)
    error(req, res,'Ha ocurrido un error intente mas tarde',500,err.message)
    /* next(err) */
}

function errorHandler(err, req, res, next) {
    console.log('errorHandler');
    next(err);
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler,
}