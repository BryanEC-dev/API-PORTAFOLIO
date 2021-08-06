const express = require('express');
const userRouter = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const {error} = require('../../../response/error')
const {userIDSchema,
    userSchema} = require('./model')

const validation = require('../../../middlewares/validateHandler');
const passport = require('passport');
const { verifyUser } = require('../../../middlewares/authenticateHandler');
const { response } = require('express');




userRouter.route('/')
.get(async (req,res,next) => {
   try {
        data = await controller.get()
        return success(req,res,data,200)
    } catch (error) {
        next(error) 
    }
    
})
.post(validation(userSchema), async (req,res,next) => {
    try {
        message = await controller.post(req.body)
        success(req,res,message,201)  
    } catch (error) {
        next(error)
    }
     
 })
 .put(verifyUser,validation(userSchema), async (req,res,next) => {
    try {
        
        response = await controller.update(req.user._id,req.body)
        if(response.user && response.auth){
            success(req,res,'Actualización realizada con éxito',200)  
        }
            error(req,res,'Error al realizar la actualización',500)
            
    } catch (error) {
        next(error)
    }
     
 })
 .delete(verifyUser, async (req,res,next) => {
    try {
        data = await controller.remove(req.user._id)
        console.log('id: ',req.user._id);
        success(req,res,'usuario eliminado',200)  
    } catch (error) {
        next(error)
    }
     
 })

 userRouter.route('/:id')
.get(async (req,res,next) => {
    try {
        data = await controller.get(req.params.id)
        return success(req,res,data,200) 
    } catch (error) {
        next(error)
    }
    
})
.post(async (req,res,next) => {
    try {
        success(req,res,'Method post not allowed',405)  
    } catch (error) {
        next(error)
    }
     
 })
 .put(verifyUser, async (req,res,next) => {
    try {
        log( req.user)
        response = controller.update(req.user._id,req.body)
        success(req,res,'Actualización realizada con éxito',405)  
    } catch (error) {
        next(error)
    }
     
 })
 .delete( async (req,res,next) => {
    try {
        success(req,res,'Method delete not allowed',405)  
    } catch (error) {
        next(error)
    }
     
 })





module.exports = userRouter;