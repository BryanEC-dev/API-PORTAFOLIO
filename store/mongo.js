const { MongoClient } = require('mongodb')
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

async function list(_collection) {
    try {
        db = await connect();
        const collection = db.collection(_collection);
        const findResult = await collection.find({}).toArray();
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

async function save(_collection,data){
    /* try {
        db = await connect();
        const collection = db.collection(_collection);
        const insertResult = await collection.insertOne(data)
        console.log('Inserted documents =>',insertResult.insertedId )
        return insertResult.insertedId
    } catch (error) {
        console.log(error);
        client.close()
    } */

    return true;
   
}

module.exports = {
    list,
    save,
    listQuery,
}