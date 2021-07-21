const express = require('express');
const userRouter = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const {userIDSchema,
    userSchema,} = require('./model')

const validation = require('../../../middlewares/validateHandler');
const passport = require('passport');
const { verifyUser } = require('../../../middlewares/authenticateHandler');




userRouter.route('/')
.get(verifyUser, async (req,res,next) => {
   try {
        data = await controller.get()
        return success(req,res,data,200)
    } catch (error) {
        next(error) 
    }
    
})
.post( validation(userSchema) ,async function (req,res,next) {
    try {
        message = await controller.post(req.body)
        sucess_response.success(req,res,message,201)  
    } catch (error) {
        next(error)
    }
    
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