const mongo = require('../../../store/mongo')
const COLLECTION = 'information'

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


async function post(data, id){
    try {

        save = await mongo.save(COLLECTION, data,true);
        console.log('controller: ', save );
        if(!save.acknowledged){
            return false;
        }
        return true

    } catch (error) {
        throw new Error(error)
    }
    
}

async function update(id,data){
    try {
        
       updateUser = await mongo.update(COLLECTION,id,data) 
       if(updateUser.modifiedCount){
        return updateUser.modifiedCount
       } 
       return false
    } catch (error) {
        throw new Error(error)  
    }
}



module.exports = {
    get,
    post,
    update,
    getQuery,
}