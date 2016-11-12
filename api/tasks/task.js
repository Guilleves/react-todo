let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let database = require ('../database.js');
let getCollection = database.getCollection('tasks');

class Task {
  constructor(user_id, description, state) {
    this.user_id = user_id;
    this.description = description;
    // this.created_at = timestamp['created_at'];
    // this.updated_at = timestamp['updated_at'];
    this.state = state;
  }
  save(callback) {
    getCollection.then((collection) => {
      let t = {
        "user_id":  this.user_id,
        "description": this.description,
        "state": this.state
      };
      debugger
      collection.insert(t, function(){
        callback(null, t)
      })
    })
  }
};

Task.find(id, callback) {
  getCollection.then((collection) => {
  collection.find('_id': id).toArray(function(err, docs) {
    debugger
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
    });
  })
};







module.exports = Task;
