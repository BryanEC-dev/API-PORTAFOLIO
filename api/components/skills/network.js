const express = require('express');
const router = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const {error} = require('../../../response/error')
const validation = require('../../../middlewares/validateHandler');
const { verifyUser, verifyAdmin } = require('../../../middlewares/authenticateHandler');
const {userIDSchema,skillSchema} = require('./model')

router.get('/',verifyUser, async function (req,res,next) {
    try {
        query = { "userId" :req.user._id}
        data = await controller.getQuery(query)
        console.log(data);
        if(data){
            response = "Consulta realizada con exito"
            success(req,res,data,200,response)  
        }else{
            response = "No existen datos del usuario"
            error(req,res,response,404,response)  
        }
       
    } catch (error) {
        next(error)
    }
})
.post('/',verifyUser,validation(skillSchema), async function (req,res,next) {
    try {
        req.body.userId = req.user._id
        response = await controller.post(req.body)
        if(response){
            message = "Registro creado con éxito"
            status = 201
        }else{
            message = "La información del usuario ya se encuentra registrada" 
            status = 200
        }
        success(req,res,body={},status,message)  
    } catch (error) {
        next(error)
    }
})
.put('/',verifyUser,validation(skillSchema), async function (req,res,next) {
    try {

        response = await controller.update(req.user._id, req.body)
        console.log("response:", response);
        
        if(response == true){
            response = "Registro actualizado con éxito"
            status=200
        }else if (response == false){
            response = "Debe registrar los datos del usuario para realizar luego la actualización"
            status = 404

        }else if(response == 'no'){
            response = "Los datos del usuario se encuentran actualizados"
            status=200
        }

        if(status == 404){
            error(req,res,response,404,response)
        }
        
        success(req,res,body={},200,response)  
            
        
    } catch (error) {
        next(error)
    }
})
.delete('/',verifyUser, async function (req,res,next) {
    try {
        console.log(req.data);
        if(req.body.type){
            id = req.user._id

            response = await controller.remove(req.user._id,req.body.type)
            
            if(response){
                message = "Registro eliminado con éxito"
                status = 200
                success(req,res,body={},status,message) 
                return
            }else{
                message = "No existe información del usuario" 
                status = 404
                error(req,res,message,404,message)
                return
            }
            
           
        }

         error(req,res,'Debe proporcionar el parámetro type',400,'Debe proporcionar el parámetro type')
         return

       
         
    } catch (error) {
        next(error)
    }
})


module.exports = router;