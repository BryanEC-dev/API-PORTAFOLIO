const express = require('express');
const router = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const validation = require('../../../middlewares/validateHandler');
const { verifyUser, verifyAdmin } = require('../../../middlewares/authenticateHandler');
const {userIDSchema,informationSchema} = require('./model')

router.get('/',verifyUser, async function (req,res,next) {
    try {
        data = await controller.get(req.user._id)
        console.log(data);
        if(data){
            message = "Consulta realizada con éxito"
        }else{
            message = "No existe información del usuario"
        }
        success(req,res,data,200,message)  
    } catch (error) {
        next(error)
    }
})
.post('/',verifyUser,validation(informationSchema), async function (req,res,next) {
    try {
        req.body._id = req.user._id
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
.put('/',verifyUser,validation(informationSchema), async function (req,res,next) {
    try {

        response = await controller.update(req.user._id, req.body)
        if(response){
            message = "Actualización realizada con éxito"
        }else{
            message = "Los datos se encuentran actualizados"

        }
        success(req,res,body={},200,message) 
            
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;