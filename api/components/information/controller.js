const mongo = require('../../../store/mongo');

function get(){
    return mongo.list('information')
    
}

module.exports = {
    get,
}