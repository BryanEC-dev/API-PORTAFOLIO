module.exports = {
    log : {
        logger_level : process.env.LOGGER_LEVEL || 'debug'
    },
    api: {
        port : process.env.API_PORT || 3000
    },
    mongo : {
        DB_USER : '',
        DB_PASSWORD : '',
        DB_HOST: 'localhost',
        DB_PORT: '27017',
        DB_NAME: 'briefcase',
    }
}