const mongo = require('../../../store/mongo')
const bcrypt = require('bcrypt');

const saltRounds = 10;
const COLLECTION = 'user'

async function get(id = null){
    try {
        if(id == null){
            data = await mongo.list(COLLECTION)
            console.log(data);
            return data
        }
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
            save = await mongo.save(COLLECTION, cleanData);
    
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

function update(){
    
}


function remove(){
    
}

module.exports = {
    get,
    post,
    update,
    remove,
    getQuery,
}