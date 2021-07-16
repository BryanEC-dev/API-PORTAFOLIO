const express = require('express');
const logger = require('../log')
const config = require('../config')
const router = express.Router();
const informationRoute = require('./components/information/network')
const userRouter = require('./components/user/network')
const {logErrors,
    clientErrorHandler,
    errorHandler,
} = require('../middlewares/errorHandler')

app = express();

app.use(express.json());


app.use(router);
app.use('/information',informationRoute)
app.use('/user',userRouter)

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);



app.listen(config.api.port, () => {
    logger.info(`Api corriendo en el puerto ${config.api.port} `)
});