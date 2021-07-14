const express = require('express');
const logger = require('../log')
const config = require('../config')
const router = express.Router();

app = express();


app.use(router);


router.get('/', function(req,res) {
    console.log(req.headers);
    res.send("Hola mundo desde express");
})


app.listen(config.api.port, () => {
    logger.info(`Api corriendo en el puerto ${config.api.port} `)
});