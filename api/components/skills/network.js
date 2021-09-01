const express = require('express');
const router = express.Router();
const controller = require('./controller')
const {success} = require('../../../response/succes')
const validation = require('../../../middlewares/validateHandler');
const { verifyUser, verifyAdmin } = require('../../../middlewares/authenticateHandler');
const {userIDSchema,skillSchema} = require('./model')

router.get('/',verifyUser, async function (req,res,next) {
    try {
        data = await controller.get(req.user._id)
        console.log(data);
        if(data == []){
            response = {"Message" : "No existen datos del usuario"}
        }else{
            response = {"Message" : "Consulta realizada con exito", "data" : data}
        }
        success(req,res,response,200)  
    } catch (error) {
        next(error)
    }
})
.post('/',verifyUser,validation(skillSchema), async function (req,res,next) {
    try {
        req.body._id = req.user._id
        response = await controller.post(req.body)
        if(response){
            response = {"Message" : "Registro creado con éxito"}
            status = 201
        }else{
            response = {"Message" : "La información ya se encuentra ingresada"}
            status = 200
        }
        success(req,res,response,status)  
    } catch (error) {
        next(error)
    }
})
.put('/',verifyUser,validation(informationSchema), async function (req,res,next) {
    try {

        response = await controller.update(req.user._id, req.body)
        console.log("response:", response);
        if(response == 0){
            response = {"message": "No hay datos que actualizar"}
        }else{
            response = {"message": "Actualización realizada con éxito"}

        }
        success(req,res,response,200)  
            
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;