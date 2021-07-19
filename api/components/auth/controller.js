const mongo = require('../../../store/mongo');

function save(data) {
    try {
        mongo.save(COLLECTION, cleanData);
    } catch (error) {
        
    }
}