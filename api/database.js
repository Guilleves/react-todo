let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// Connection URL
let url = 'mongodb://localhost:27017/react-todo';

// Use connect method to connect to the server
var connect = new Promise(
    function (resolve, reject) {
        MongoClient.connect(url, function(err, database) {
            console.log("Connecting to mongodb ") + url
            if(err) reject(err);
            resolve(database);
        })
    }
);

let getCollection = (coll) => {
    return new Promise((resolve,reject) => {
        connect.then((db) => {
            resolve(db.collection(coll))
        })
    })
};

let dropDatabase = function(){
    return new Promise((resolve,reject) => {
        connect.then((db) => {
            db.dropDatabase((err,result) => {
                if(err) reject(err)
                resolve(result)
            })
        })
    })
};

module.exports = {
    drop: dropDatabase,
    connect: connect,
    getCollection: getCollection,
    url: url
}
