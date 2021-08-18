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
    try {
        cleanData = {
            username : data.username,  
        }

        user = await getQuery(cleanData)
        if(!user.length) {
            save = await mongo.save(COLLECTION, {
            username : data.username,  
        });
    
            if(save){
                console.log(typeof(save));
                auth = {
                    _id : save,
                    username : data.username,
                    password : await bcrypt.hash(data.password,saltRounds),
                    admin : false,
                }
    
                save = mongo.save('auth', auth);
           }
            return 'Registro realizado con éxito'
        }
        
        return 'El usuario ya se encuentra registrado'

    } catch (error) {
        throw new Error(error)
    }
    
}

async function update(id,data){
    try {
        
       updateUser = await mongo.update(COLLECTION,id,{"username":  data.username}) 
       if(updateUser.modifiedCount){
        
        updateAuth = await mongo.update('auth', id, {
            username : data.username,
            password : await bcrypt.hash(data.password,saltRounds),
            admin : false,
        });

        return {'update1' :updateUser.modifiedCount,'update2' : updateAuth.modifiedCount }

       } 
    } catch (error) {
        throw new Error(error)  
    }
}


async function remove(id){
    try {
        data = await mongo.remove(COLLECTION, id);
        return data;
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