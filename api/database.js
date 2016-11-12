let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// Connection URL
let url = 'mongodb://localhost:27017/react-todo';

// Use connect method to connect to the server
let connect  = MongoClient.connect('mongodb://localhost:27017/react-todo', function(err, db) {
  assert.equal(null, err);+
  console.log("Connected successfully to server");
  db.close();
});

let getCollection = (coll) => {
    return new Promise((resolve,reject) => {
        debugger
        connect.then((db) => {
            debugger
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
