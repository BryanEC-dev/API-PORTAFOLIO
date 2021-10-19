const mongo = require('../../../store/mongo')
const COLLECTION = 'skill'

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

        query = { "userId" :data.userId, "type": data.type }
        console.log(query);
        getQuery = await mongo.listQuery(COLLECTION, query);
        console.log('getquery: ',getQuery);
        if(getQuery.length != 0){
            console.log('Entre al false');
            return false
        }


        save = await mongo.save(COLLECTION, data,true);
        console.log('controller: ', save );
        if(!save){
            return false;
        } 
        return true

    } catch (error) {
        throw new Error(error)
    }
    
}

async function update(id,data){
    try {
        
        query = { "userId" :id, "type": data.type }
        console.log(query);
        
        getQuery = await mongo.listQuery(COLLECTION, query);
        console.log('getquery: ',getQuery, getQuery.length);
        
        if(!getQuery.length){
            console.log('Entre al false');
            return false
        }

       updateSkill = await mongo.updateQuery(COLLECTION,query,data) 
       if(updateSkill.modifiedCount){
        return true
       } 
       return 'no'
       
    } catch (error) {
        throw new Error(error)  
    }
}


async function remove(id,type){
    try {
        
        query = { "userId" :id, "type": type }
        console.log(query);
        
        getQuery = await mongo.listQuery(COLLECTION, query);
        console.log('getquery: ',getQuery, getQuery.length);
        
        if(!getQuery.length){
            console.log('Entre al false');
            return false
        }

       deleteSkill = await mongo.deleteQuery(COLLECTION,query) 
       if(deleteSkill.deletedCount){
        return true
       } 
      
       
    } catch (error) {
        throw new Error(error)  
    }
}



module.exports = {
    get,
    post,
    update,
    getQuery,
    remove,
}