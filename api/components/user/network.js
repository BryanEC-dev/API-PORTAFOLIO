const express = require('express');
const userRouter = express.Router();
const controller = require('./controller')
const sucess_response = require('../../../response/succes')

userRouter.route('/')
.get( (req,res,next) => {
    data = []
    return sucess_response.success(req,res,data,200)
})
.post( function (req,res,next) {
    sucess_response.success(req,res,'ok',200)  
})

userRouter.route('/:id')
.get( function (req,res,next) {
    sucess_response.success(req,res,'ok',200)
})
.post( function (req,res,next) {
    sucess_response.success(req,res,'ok',200)  
})
.put( function (req,res,next) {
    sucess_response.success(req,res,'ok',200)
})
.delete( function (req,res,next) {
    sucess_response.success(req,res,'ok',200) 
})

module.exports = userRouter;