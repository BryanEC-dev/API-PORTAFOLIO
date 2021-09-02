const mongo = require('../../../store/mongo')
const bcrypt = require('bcrypt');

const saltRounds = 10;
const COLLECTION = 'user'

async function get(id){
    try {
        data = await mongo.list(COLLECTION,id)
            return data
    } catch (error) {
        throw new Error(error)
    }
   
   
}

async function getQuery(parameter){
    try {
        data = await mongo.listQuery(COLLECTION, parameter);
        return data;
    } catch (error) {
        throw new Error(error)
    }
   
}
/* 
    Guarda un usuario en la BD en la colección user y auth
*/
async function post(data){
    let auth = {}
    let user = {}
    try {
        cleanData = {
            username : data.username,  
        }

        userExists = await getQuery(cleanData)
        if(!userExists.length) {
            user = await mongo.save(COLLECTION, {
            username : data.username,  
            });

            console.log('usuario registrado', user)
            if(user.acknowledged){
               
                authData = {
                    _id : user.insertedId,
                    username : data.username,
                    password : await bcrypt.hash(data.password,saltRounds),
                    admin : false,
                }
    
                auth = await mongo.save('auth', authData);
                console.log('auth',auth);
           }

          
            

            
           if(user.acknowledged && auth.acknowledged){
               console.log('primer if');
            return {register : true, message: "Registro realizado con exito "}
            
          }else if(user.acknowledged){
            // eliminar el usuario de la tabla user
            console.log('2 if');
            return {register : false, message: "Hubo un error al realizar el registro "}
            
          }else{
            console.log('3 if');
            return {register : false, message: "Hubo un error al realizar el registro "}

            
          } 
        }
        
        return {register : true, message: "El usuario ya se encuentra registrado"}
       

    } catch (error) {
        throw new Error(error)
    }
    
}

async function update(id,data){
    try {
        
        updateUser = await mongo.update(COLLECTION,id,{"username":  data.username}) 
       
        updateAuth = await mongo.update('auth', id, {
            username : data.username,
            password : await bcrypt.hash(data.password,saltRounds),
            admin : false,
        });


        return {'user' :updateUser.modifiedCount,'auth' : updateAuth.modifiedCount }

       
    } catch (error) {
        throw new Error(error)  
    }
}


async function remove(id){
    try {
        user = await mongo.remove(COLLECTION, id);
        auth = await mongo.remove('auth', id);
        console.log(user)
        console.log(auth)

        if (user.deletedCount && auth.deletedCount){
            return true
        }

        return false;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    get,
    post,
    update,
    remove,
    getQuery,
}