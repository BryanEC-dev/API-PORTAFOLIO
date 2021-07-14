const express = require('express');
const router = express.Router();
const controller = require('./controller')
const sucess_response = require('../../../response/succes')

router.get('/', function (req,res) {
    data = controller.get();
    return sucess_response.success(req,res,data,200)
})


module.exports = router;