const express = require('express');
const userRouter = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const {error} = require('../../../response/error')
const {userIDSchema,
    userSchema} = require('./model')
const logger = require('../../../log')
const validation = require('../../../middlewares/validateHandler');
const passport = require('passport');
const { verifyUser, verifyAdmin } = require('../../../middlewares/authenticateHandler');
const { response } = require('express');




userRouter.route('/')
.get(verifyUser,async (req,res,next) => {
    logger.info('realizando consulta')
   try {
        data = await controller.get(req.user._id)
        return success(req,res,data,200, 'Consulta realiza con éxito')
    } catch (error) {
        next(error) 
    }
    
})
.post(validation(userSchema), async (req,res,next) => {
    try {
        responseMethod = await controller.post(req.body)

        if(responseMethod.register){
            success(req,res,body = {},201,responseMethod.message)  
        }else {
            error(req,res,response.message,500)
        }
    } catch (error) {
        next(error)
    }   
 })
 .put(verifyUser,validation(userSchema), async (req,res,next) => {
    try {
        
        responseMethod = await controller.update(req.user._id,req.body)
        
        if(responseMethod.user || responseMethod.auth){
            success(req,res,body={},200, 'Actualización realizada con éxito')  
        }else{
            error(req,res,'Ha ocurrido un error intente mas tarde',500, 'No se pudo realizar la actualización')
        }
            
    } catch (error) {
        next(error)
    }
     
 })
 .delete(verifyUser, async (req,res,next) => {
    try {
        console.log('id: ',req.user._id);
        responseMethod = await controller.remove(req.user._id)
        if(responseMethod){
            success(req,res,'usuario eliminado',200)  
        }else{
            error(req,res, 'Hubo un error al eliminar la información del usuario')
        }
        
    } catch (error) {
        next(error)
    }
     
 })

 userRouter.route('/:id')
.get(verifyUser,verifyAdmin,async (req,res,next) => {
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
 .put( async (req,res,next) => {
    try {
        success(req,res,'Method post not allowed',405)  
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

 userRouter.route('/all/admin')
 .get(verifyUser,verifyAdmin, async (req,res,next) => {
    try {
         data = await controller.get()
         return success(req,res,data,200)
     } catch (error) {
         next(error) 
     }
     
 })
 .post( async (req,res,next) => {
    try {
        success(req,res,'Method post not allowed',405)  
    } catch (error) {
        next(error)
    }
 })
 .put( async (req,res,next) => {
    try {
        success(req,res,'Method put not allowed',405)  
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