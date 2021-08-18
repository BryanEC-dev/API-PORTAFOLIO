const { MongoClient, ObjectId} = require('mongodb')


const config = require('../config')


// Connection URL
const MONGO_URI = `mongodb://${config.mongo.DB_HOST}:${config.mongo.DB_PORT}`;
const client = new MongoClient(MONGO_URI)

// Database Name
const DB_NAME = config.mongo.DB_NAME;

async function connect() {
    try {
        await client.connect()
        console.log('Connected successfully to server');
        return db = client.db(DB_NAME);
         
    } catch (error) {
        console.log(error);
    }
    
}

async function list(_collection,_id= null) {
    try {
        
        db = await connect();
        const collection = db.collection(_collection);
        let findResult = null;
        if(_id == null){
            findResult = await collection.find({}).toArray();
        }else{
            findResult = await collection.find({'_id' : new ObjectId(_id) }).toArray();
        }
        client.close()
        return findResult;
        
    } catch (error) {
        console.log(error);
        client.close()
    }
    
}

async function listQuery(_collection,query) {
    try {
    
        db = await connect();
        const collection = db.collection(_collection);
        const findResult = await collection.find(query).toArray();
        client.close()
        return findResult;
        
    } catch (error) {
        console.log(error);
        client.close()
    }
    
}

async function save(_collection,data,idValidation = false ){
    try {
        informationData = null;
        if(idValidation){
            informationData = await list(_collection,data._id)
        }
        console.log('information: ',informationData.length);
        if(informationData.length != 0){
            return false
        }
        
        db = await connect();
        const collection = db.collection(_collection);
        const insertResult = await collection.insertOne(data)
        console.log('Inserted documents =>',insertResult)
        return insertResult.acknowledged

    } catch (error) {
        console.log(error);
        client.close()
    }
    return true;
   
}
// TODO que pasa si hay un error
async function remove(_collection,id){
    try {
        db = await connect();
        const collection = db.collection(_collection);
        const removeResult = await collection.deleteOne({'_id' : id})
        console.log('Inserted documents =>',removeResult )
        return removeResult
    } catch (error) {
        console.log(error);
        client.close()
    }
}

async function update(_collection,id,data){
    try {
        db = await connect();
        const collection =  db.collection(_collection);
        console.log(id,data);
        const updateResult = await collection.updateOne({'_id' :  new ObjectId(id)} , {$set :data});
        console.log(updateResult);
        return updateResult;
    } catch (error) {
        console.log(error);
        client.close()
    }
}

module.exports = {
    list,
    save,
    listQuery,
    remove,
    update,
}