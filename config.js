module.exports = {
    log : {
        logger_level : process.env.LOGGER_LEVEL || 'debug'
    },
    api: {
        port : process.env.API_PORT || 3000
    }
}